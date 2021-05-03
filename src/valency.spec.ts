import Valency from './valency'

const BASE_URL = 'https://cdn.valency.design/'
const defaultConfig = {
      uid: 'ahkohd',
      project: 'someprojectid',
      library: 'somelibraryid',
}
const testAssetURL = `${BASE_URL}${defaultConfig.uid}/${defaultConfig.project}/${defaultConfig.library}/`

describe('Test Valency class', () => {
      afterEach(() => {
            document.body.innerHTML = ''
      })

      describe('Check if base URL is correct', () => {
            it(`should return: ${BASE_URL}`, () => {
                  expect(Valency.baseUrl).toEqual(BASE_URL)
            })
      })

      describe('Test getConfig() method', () => {
            it(`should return`, () => {
                  expect(
                        new Valency(defaultConfig).getConfig({
                              library: 'lorem',
                        })
                  ).toEqual({
                        uid: 'ahkohd',
                        project: 'someprojectid',
                        library: 'lorem',
                  })
            })
      })

      describe('Test setConfig() method', () => {
            it(`should return`, () => {
                  const valent = new Valency(defaultConfig)

                  valent.setConfig({
                        uid: 'mkbhd',
                  })

                  expect(valent.getConfig().uid).toEqual('mkbhd')
            })
      })

      describe('Test get() method', () => {
            it(`should return`, () => {
                  const assetName = 'cat-dog'
                  const assetURL = new Valency(defaultConfig).get(assetName)

                  expect(assetURL).toEqual(testAssetURL + assetName)
            })
      })

      describe('Test createValencyProxy() method', () => {
            it(`should return`, () => {
                  const assetName = 'Some Asset Name'
                  const valent = new Valency(defaultConfig)
                  valent.asset = valent.createValencyProxy()

                  expect(valent.asset[assetName].url).toEqual(
                        valent.get(assetName)
                  )
            })
      })

      describe('Test replace() method', () => {
            it(`should set src attribute to asset's URL of IMG element with data-valency="cat-dog"`, () => {
                  document.body.innerHTML = `<img data-valency="cat-dog">`

                  new Valency(defaultConfig).replace(undefined, document)

                  expect(document.body.innerHTML).toBe(
                        `<img data-valency="cat-dog" src="${`${testAssetURL}cat-dog`}">`
                  )
            })

            it(`should set data attribute to asset's URL of OBJECT element with data-valency="cat-dog"`, () => {
                  document.body.innerHTML = `<object data-valency="cat-dog"></object>`

                  new Valency(defaultConfig).replace(undefined, document)

                  expect(document.body.innerHTML).toBe(
                        `<object data-valency="cat-dog" data="${`${testAssetURL}cat-dog`}"></object>`
                  )
            })

            it(`should set background image to asset's URL of DIV element with data-valency="cat-dog"`, () => {
                  document.body.innerHTML = `<div data-valency="cat-dog"></div>`

                  new Valency(defaultConfig).replace(undefined, document)

                  expect(
                        (document.body.children[0] as HTMLDivElement).style
                              .backgroundImage
                  ).toBe(`url(${testAssetURL}cat-dog)`)
            })

            it(`should replace I with an SVG element referencing the default library's icons SVG sprite with the ID which corresponds with data-valency="cat-dog"`, () => {
                  document.body.innerHTML = `<i data-valency="cat-dog"></i>`

                  new Valency(defaultConfig).replace(undefined, document)

                  expect(document.body.innerHTML).toBe(
                        `<svg data-valency="cat-dog"><use xlink:href="${testAssetURL}icons.svg#cat-dog"></use></svg>`
                  )
            })

            it(`should replace I with an SVG element referencing the custom provided (using data-valency-lib) library's icons SVG sprite with the ID which corresponds with data-valency="cat-dog"`, () => {
                  document.body.innerHTML = `<i data-valency="cat-dog" data-valency-lib="niceicons"></i>`

                  new Valency(defaultConfig).replace(undefined, document)

                  expect(document.body.innerHTML).toBe(
                        `<svg data-valency="cat-dog" data-valency-lib="niceicons"><use xlink:href="${BASE_URL}${defaultConfig.uid}/${defaultConfig.project}/niceicons/icons.svg#cat-dog"></use></svg>`
                  )
            })

            it(`shoud replace current SVG  a SVG using an icon from the default library's icons SVG sprite with data-valency="cat-dog" value corresponding to icon's ID`, () => {
                  document.body.innerHTML = `<svg data-valency="cat-dog" width="24" height="24" fill="none" stroke="currentColor"></svg>`

                  new Valency(defaultConfig).replace(undefined, document)
                  expect(document.body.innerHTML).toBe(
                        `<svg data-valency="cat-dog" width="24" height="24" fill="none" stroke="currentColor"><use xlink:href="${testAssetURL}icons.svg#cat-dog"></use></svg>`
                  )
            })
      })

      describe('Test proxy object', () => {
            it(`Valency.asset.likeIcon.url should return: ${`${testAssetURL}likeIcon`}`, () => {
                  const valent = new Valency(defaultConfig)
                  expect(valent.asset.someAssetName.url).toEqual(
                        valent.get('someAssetName')
                  )
            })

            it(`Valency.asset['Some Asset Name'].url should return: ${`${testAssetURL}man-dog`}`, () => {
                  const valent = new Valency(defaultConfig)
                  expect(valent.asset['Some Asset Name'].url).toEqual(
                        valent.get('Some Asset Name')
                  )
            })

            it(`Valency.asset.yourLibraryId.someAssetName.url should return: ${`${testAssetURL}man-dog`}`, () => {
                  const valent = new Valency(defaultConfig)
                  expect(valent.asset.yourLibraryId.someAssetName.url).toEqual(
                        valent.get('someAssetName', {
                              library: 'yourLibraryId',
                        })
                  )
            })

            it(`Valency.asset.yourProjectId.yourLibraryName.someAssetName.url should return: ${`${testAssetURL}man-dog`}`, () => {
                  const valent = new Valency(defaultConfig)
                  expect(
                        valent.asset.yourProjectId.yourLibraryName.someAssetName
                              .url
                  ).toEqual(
                        valent.get('someAssetName', {
                              library: 'yourLibraryName',
                              project: 'yourProjectId',
                        })
                  )
            })

            it(`Valency.asset.yourUid.yourProjectId.yourLibraryName.someAssetName.url should return: ${`${testAssetURL}man-dog`}`, () => {
                  const valent = new Valency(defaultConfig)
                  expect(
                        valent.asset.yourUid.yourProjectId.yourLibraryName
                              .someAssetName.url
                  ).toEqual(
                        valent.get('someAssetName', {
                              library: 'yourLibraryName',
                              project: 'yourProjectId',
                              uid: 'yourUid',
                        })
                  )
            })
      })
})
