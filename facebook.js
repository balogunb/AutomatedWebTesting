const puppeteer = require('puppeteer')

// const url = process.argv[2];
// if(!url){
//   throw "Please provide a URL as the first argument";
// }

//time delay function
  function delay(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }


async function run(){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //await page.emulate(devices['iPhone 6']);
//  await page.goto(url);


/**Go to login page  **/
  await page.goto("https://facebook.com/login");
  //await page.screenshot({path: 'full.png', fullPage: true});
  await page.screenshot({path: 'loginPage.png'});


/** Fill in fields then take screenshot**/
  await page.waitFor('input[name=email]');
  await page.waitFor('input[name=pass]');
  await delay(1000);
  await page.$eval('input[name=email]', el => el.value = 'balogun.basit@yahoo.com');
  await delay(1000);
  await page.$eval('input[name=pass]', el => el.value = 'XXXXXX');
  await page.screenshot({path: 'logindetails.png'});


  /** Click login and take a screenshot of the new page **/




  await delay(3000);
  await page.waitFor('input[type=submit]');
  await page.click('input[type="submit"]');
  await page.screenshot({path: 'WorkrailsSC/loggedin.png'});






  browser.close();
}


run();
