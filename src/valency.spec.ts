import { Valency } from './valency'

const BASE_URL = 'https://cdn.valency.design/'
const defaultConfig = {
      username: 'ahkohd',
      defaultProjectId: 'someprojectid',
      defaultLibrary: 'somelibrary',
}
const testAssetURL = `${BASE_URL}${defaultConfig.username}/${defaultConfig.defaultProjectId}/${defaultConfig.defaultLibrary}/`

describe('Test Valency class', () => {
      afterEach(() => {
            document.body.innerHTML = ''
      })

      describe('Check if base URL is correct', () => {
            it(`shoud return: ${BASE_URL}`, () => {
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
                        username: 'ahkohd',
                        project: 'someprojectid',
                        library: 'lorem',
                  })
            })
      })

      describe('Test get() method', () => {
            it(`should return`, () => {
                  const assetName = 'cat-dog'
                  const assetURL = new Valency(defaultConfig).get(assetName)

                  expect(assetURL).toEqual(testAssetURL + assetName)
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
                        `<svg data-valency="cat-dog" data-valency-lib="niceicons"><use xlink:href="${BASE_URL}${defaultConfig.username}/${defaultConfig.defaultProjectId}/niceicons/icons.svg#cat-dog"></use></svg>`
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
})
