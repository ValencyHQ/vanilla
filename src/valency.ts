export type ValencyConfig = {
      username: string
      defaultProjectId: string
      defaultLibrary: string
}

export type Config = {
      username?: string
      project?: string
      library?: string
}

export class Valency {
      public static baseUrl = 'https://cdn.valency.design/'

      constructor(private baseConfig: ValencyConfig) {}

      /**
       * Returns configuration
       */

      getConfig(otherConfig?: Config): Config {
            return {
                  username: otherConfig?.username ?? this.baseConfig.username,
                  project:
                        otherConfig?.project ??
                        this.baseConfig.defaultProjectId,
                  library:
                        otherConfig?.library ?? this.baseConfig.defaultLibrary,
            }
      }

      /**
       *
       * @param assetName
       * @param config (optional) If not provided, will use the base config
       * @returns a URL to the provided `assetName`
       */

      get(assetName: string, config?: Config): string {
            const preset = this.getConfig(config)

            return `${Valency.baseUrl}${preset.username}/${preset.project}/${preset.library}/${assetName}`
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

            ;[...doc.querySelectorAll('[data-valency]')].forEach((node) => {
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
                        ;[...element.attributes].forEach((attr) => {
                              svgElement.setAttribute(attr.name, attr.value)
                        })

                        element.replaceWith(svgElement)
                  }
            })
      }
}
