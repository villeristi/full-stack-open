describe('Headless', () => {
  let page

  beforeAll(async () => {
    // jest.setTimeout(35000)
    page = await global.__BROWSER__.newPage()
    await page.goto('http://localhost:1337')
  })

  it('Renders Login', async () => {
    await page.goto('http://localhost:3003')
    const textContent = await page.$eval('body', el => el.textContent)

    expect(textContent.includes('Login')).toBe(true)
  })

})
