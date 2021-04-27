import { Valency } from './valency'

const BASE_URL = 'https://cdn.valency.design/'
const defaultConfig = {
      username: 'ahkohd',
      defaultProjectId: 'id',
      defaultLibrary: '123',
}

describe('Test Valency class', () => {
      afterEach(() => {
            document.body.innerHTML = ''
      })

      describe('Check if base URL is correct', () => {
            it(`shoud return: ${BASE_URL}`, () => {
                  expect(Valency.baseUrl).toEqual(BASE_URL)
            })
      })

      describe('Test get() method', () => {
            it(`should return`, () => {
                  const assetName = 'cat-dog'
                  const assetURL = new Valency(defaultConfig).get(assetName)

                  expect(assetURL).toEqual(
                        `${BASE_URL}${defaultConfig.username}/${defaultConfig.defaultProjectId}/${defaultConfig.defaultLibrary}/${assetName}`
                  )
            })
      })

      describe('Test replace() method', () => {
            it(`should set src attribute to asset's URL of IMG element with data-valency="cat-dog"`, () => {
                  document.body.innerHTML = `<img data-valency="cat-dog">`.trim()

                  new Valency(defaultConfig).replace(undefined, document)

                  expect(document.body.innerHTML).toBe(
                        `<img data-valency="cat-dog" src="${`${BASE_URL}${defaultConfig.username}/${defaultConfig.defaultProjectId}/${defaultConfig.defaultLibrary}/cat-dog`}">`
                  )
            })

            it(`should set data attribute to asset's URL of OBJECT element with data-valency="cat-dog"`, () => {
                  document.body.innerHTML = `<object data-valency="cat-dog"></object>`.trim()

                  new Valency(defaultConfig).replace(undefined, document)

                  expect(document.body.innerHTML).toBe(
                        `<object data-valency="cat-dog" data="${`${BASE_URL}${defaultConfig.username}/${defaultConfig.defaultProjectId}/${defaultConfig.defaultLibrary}/cat-dog`}"></object>`
                  )
            })

            it(`should set background image to asset's URL of DIV element with data-valency="cat-dog"`, () => {
                  document.body.innerHTML = `<div data-valency="cat-dog"></div>`

                  new Valency(defaultConfig).replace(undefined, document)

                  expect(
                        (document.body.children[0] as HTMLDivElement).style
                              .backgroundImage
                  ).toBe(
                        `url(${BASE_URL}${defaultConfig.username}/${defaultConfig.defaultProjectId}/${defaultConfig.defaultLibrary}/cat-dog)`
                  )
            })
      })
})
