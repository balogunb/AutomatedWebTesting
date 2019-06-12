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

/**Go to website and take screenshot  **/
  await page.goto("https://services.workrails.com/");
  await delay(3000);




  //await page.screenshot({path: 'full.png', fullPage: true});
  await page.screenshot({path: 'WRServiceIMGs/catalogPage.png', fullPage: true});






      let  button = await page.evaluate(() => {
              let results = [];
              let items = document.getElementsByClassName("catalogItemCta");

              for(var i = 0; i < items.length;i++){
                results.push({
                    button:items[i].getElementsByTagName("button")[0],
                });
              }

              items[2].getElementsByTagName("button")[0].click();
              //document.getElementsByClassName("catalogItemCta")[1].getElementsByTagName("button")[0]);
              return results.length;
          });

            let thePath = 'WRServiceIMGs/clickedPage' + 0 +'.png';
             await page.screenshot({path: thePath, fullPage: true});
          //       delay(1000);

          // let  button = await page.evaluate(() => {
          //         let results = [];
          //         let items = document.getElementsByClassName("catalogItemCta");
          //
          //
          //
          //
          //         return 0;
          //     });
          //
          //
          //     for(var i = 0; i < items.length;i++){
          //       items[i].getElementsByTagName("button")[0].click();
          //       await delay(3000);
          //       let thePath = 'WRServiceIMGs/clickedPage' + i+'.png';
          //       await page.screenshot({path: thePath, fullPage: true});
          //       delay(1000);
          //
          //     }
//console.log(buttons);



  //let elements = document.getElementsByClassName("catalogItemCta");

//await page.click(buttons[1]);
// button[1].click();


//await page.click(document.getElementsByClassName("catalogItemCta")[1].getElementsByTagName("button")[0]);




  //
  // await delay(500);
  // await page.waitFor('button[type=submit]');
  // await page.screenshot({path: 'WorkrailsSC/loggedin2.png'});
  // await page.click('button[type="submit"]');
  // await page.screenshot({path: 'WorkrailsSC/loggedin.png'});






  browser.close();
}


run();
