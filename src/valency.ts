export type ValencyConfig = {
      uid: string
      project: string
      library: string
}

export type Config = Partial<ValencyConfig>

export type ValencyProxy = Record<
      string,
      Record<
            string,
            { url: string } & Record<
                  string,
                  { url: string } & Record<string, { url: string }>
            >
      > & {
            url: string
      }
>
export interface LibarySpriteState {
      status: 'LOADING' | 'LOADED' | 'FAILED'
      name: string
}

export default class Valency {
      public static baseUrl = 'https://d23ofekumsizcj.cloudfront.net/'

      public asset: ValencyProxy

      public libraryIconsState: Array<LibarySpriteState> = []

      constructor(private baseConfig: ValencyConfig) {
            this.asset = this.createValencyProxy()
      }

      /**
       * Returns config
       */

      getConfig(otherConfig?: Config): ValencyConfig {
            return {
                  uid: otherConfig?.uid ?? this.baseConfig.uid,
                  project: otherConfig?.project ?? this.baseConfig.project,
                  library: otherConfig?.library ?? this.baseConfig.library,
            }
      }

      /**
       * Sets config
       */

      setConfig(otherConfig: Config): void {
            this.baseConfig = this.getConfig(otherConfig)
      }

      /**
       *
       * @param assetName
       * @param config (optional) If not provided, will use the base config
       * @returns a URL to the provided `assetName`
       */

      get(assetName: string, config?: Config): string {
            const preset = this.getConfig(config)

            return `${Valency.baseUrl}${preset.uid}/${preset.project}/${preset.library}/${assetName}`
      }

      /**
       * All elements that have a data-valency attribute, their
       * src atrribute will be replaced with the assset URL corresponding to their
       * data-valency attribute value.
       * See the API Reference for more information about feather.replace().
       *
       * @param config (optional) If not provided, will use the base config
       */

      replace(config?: Config, document?: HTMLDocument): void {
            const doc = document ?? window.document

            Array.from(doc.querySelectorAll('[data-valency]')).forEach(
                  (node) => {
                        const element = node as HTMLElement
                        const assetName = element.dataset?.valency ?? ''
                        const valencyLibraryName =
                              element.dataset?.valencyLib ?? undefined
                        const valencyProjectName =
                              element.dataset?.valencyProject ?? undefined
                        const valencyUid =
                              element.dataset?.valencyUid ?? undefined

                        const configure = {
                              ...config,
                              library: valencyLibraryName ?? config?.library,
                              project: valencyProjectName ?? config?.project,
                              uid: valencyUid ?? config?.uid,
                        }

                        if (element.tagName === 'IMG') {
                              ;(element as HTMLImageElement).src = this.get(
                                    assetName,
                                    configure
                              )
                        } else if (element.tagName === 'DIV') {
                              element.style.backgroundImage = `url(${this.get(
                                    assetName,
                                    configure
                              )})`
                        } else if (element.tagName === 'OBJECT') {
                              ;(element as HTMLObjectElement).data = this.get(
                                    assetName,
                                    configure
                              )
                        } else if (['I', 'svg'].includes(element.tagName)) {
                              this.loadSprite(configure)

                              const svgElement = doc.createElement('SVG')

                              svgElement.innerHTML = `<use xlink:href="#${
                                    this.getConfig(configure).library
                              }_${assetName}"></use>`
                              Array.from(element.attributes).forEach((attr) => {
                                    svgElement.setAttribute(
                                          attr.name,
                                          attr.value
                                    )
                              })

                              element.replaceWith(svgElement)
                        }
                  }
            )
      }

      createValencyProxy(): ValencyProxy {
            const trap = {
                  get: (
                        target: Partial<{ $$path: string[]; url: string }>,
                        key: string,
                        receiver: never
                  ): unknown => {
                        if (key in target) {
                              return Reflect.get(target, key, receiver)
                        }

                        if ('$$path' in target) {
                              let url
                              const $$path = [...(target?.$$path ?? []), key]

                              if ($$path.length === 2) {
                                    url = this.get($$path[1], {
                                          library: $$path[0],
                                    })
                              } else if ($$path.length === 3) {
                                    url = this.get($$path[2], {
                                          library: $$path[1],
                                          project: $$path[0],
                                    })
                              } else if ($$path.length >= 4) {
                                    url = this.get($$path[3], {
                                          library: $$path[2],
                                          project: $$path[1],
                                          uid: $$path[0],
                                    })
                              }
                              return new Proxy({ $$path, url }, trap)
                        }

                        return new Proxy(
                              { $$path: [key], url: this.get(key) },
                              trap
                        )
                  },
            }

            return new Proxy({}, trap) as never
      }

      public loadSprite(otherConfig?: Config): void {
            const config = this.getConfig(otherConfig)

            if (document.querySelector(`svg[id=icons_${config.library}]`))
                  return

            let recordIndex = this.libraryIconsState.findIndex(
                  (entry) => entry.name === config.library
            )
            const record = this.libraryIconsState[recordIndex]

            if (record && ['LOADED', 'LOADING'].includes(record.status)) return

            if (!record) {
                  this.libraryIconsState.push({
                        name: config?.library,
                        status: 'LOADING',
                  })
                  recordIndex = this.libraryIconsState.length - 1
            } else {
                  this.libraryIconsState[recordIndex].status = 'LOADING'
            }

            const iconUrl = this.get('__icons__.svg', config)

            const request = new XMLHttpRequest()
            request.open('GET', iconUrl, true)
            request.send()
            request.addEventListener('load', () => {
                  const div = document.createElement('div')
                  div.innerHTML = request.responseText

                  document.body.insertBefore(
                        div.childNodes[0],
                        document.body.childNodes[0]
                  )

                  this.libraryIconsState[recordIndex].status = 'LOADED'
            })

            request.addEventListener('error', () => {
                  this.libraryIconsState[recordIndex].status = 'FAILED'
            })
      }
}
