const puppeteer = require('puppeteer')

// const url = process.argv[2];
// if(!url){
//   throw "Please provide a URL as the first argument";
// }

async function run(){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //await page.emulate(devices['iPhone 6']);
//  await page.goto(url);


/**Go to login page  **/
await page.goto("https://dev.workrails.com/login")
  //await page.screenshot({path: 'full.png', fullPage: true});
  await page.screenshot({path: 'WorkrailsSC/loginPage.png'});


/** Fill in fields then take screenshot**/
  await page.waitFor('input[name=email]');
  await page.waitFor('input[name=password]');
  await page.$eval('input[name=email]', el => el.value = 'balogun.basit@yahoo.com');
  await page.$eval('input[name=password]', el => el.value = 'XXXXX');
  await page.screenshot({path: 'WorkrailsSC/logindetails.png'});


  /** Click login and take a screenshot of the new page **/
  await page.click('button[type="submit"]');
  await page.screenshot({path: 'WorkrailsSC/loggedin.png'});









  browser.close();
}


run();
