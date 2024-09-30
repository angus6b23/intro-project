const assert = require( "assert" )
const webdriver = require( "selenium-webdriver" )
const chrome = require( "selenium-webdriver/chrome" )
const By = webdriver.By

describe( "Frontend tests", function () {
  // Extends timeout of dom manipulation
  this.timeout( 5000 )
  let browser
  before( () => {
    // Spawn browser
    const chromeOptions = new chrome.Options()
    browser = new webdriver.Builder()
      .forBrowser( "chrome" )
      .setChromeOptions( chromeOptions )
      .build()
  } )

  beforeEach( () => {
    // Visit frontend page before tests
    browser.get( "http://localhost:3000/" )
  } )
  describe( "People view", () => {
    it( "should display list of people", async () => {
      const rows = await browser.findElements( By.css( "tr" ) )
      assert( 1 < rows.length )
      // browser.findElements( By.css( "tr" ) ).then( ( rows ) => {
      //   assert( 1 < rows.length )
      //   done()
      // } )
    } )

    it( "should display form", async (  ) => {
      // Click on add person button
      const addPersonButton = browser.findElement( By.id( "addperson" ) )
      await browser.actions().click( addPersonButton ).perform()

      // Check if form is visible
      let formEl = await browser.findElement( By.id( "personform" ) )
      let formStyle = await formEl.getAttribute( "style" )
      assert( -1 === formStyle.indexOf( "none" ) )

      // Close form
      const closeButton = await browser.findElement( By.className( "close" ) )
      await browser.actions().click( closeButton ).perform()

      // Check if form is visible again
      formEl = await browser.findElement( By.id( "personform" ) )
      formStyle = await formEl.getAttribute( "style" )
      assert( -1 !== formStyle.indexOf( "none" ) )
    } )

    it( "should display dialog", async (  ) => {
      // Click on remove button
      const removeButton = browser.findElement( By.css( ".actions button.danger" ) )
      await browser.actions().click( removeButton ).perform()

      // Check if dialog is visible
      let dialogEl = await browser.findElement( By.css( "dialog" ) )
      let dialogOpen = await dialogEl.getAttribute( "open" )
      assert( dialogOpen )

      // Close the dialog
      const closeButton = await browser.findElement( By.css( "dialog button:last-of-type" ) )
      await browser.actions().click( closeButton ).perform()

      // Check if dialog is visible again
      dialogEl = await browser.findElement( By.css( "dialog" ) )
      dialogOpen = await dialogEl.getAttribute( "open" )
      assert( !dialogOpen )
    } )
  } )

  after( () => {
    browser.close()
  } )
} )
