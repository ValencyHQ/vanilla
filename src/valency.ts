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

export default class Valency {
      public static baseUrl = 'https://cdn.valency.design/'

      public asset: ValencyProxy

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

                        const configure = {
                              ...config,
                              library: valencyLibraryName ?? config?.library,
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
                              const svgElement = doc.createElement('SVG')

                              svgElement.innerHTML = `<use xlink:href="${this.get(
                                    'icons.svg',
                                    configure
                              )}#${assetName}"></use>`
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
}
