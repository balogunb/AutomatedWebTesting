/**Default auto testing script which should work for most
  Workrails catalog sites. It has been tested on services.workrails.com,

**/
const puppeteer = require('puppeteer')


//time delay function
  function delay(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }


async function run(){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();


/**Go to website and take screenshot  **/
  await page.goto("https://champion.workrails.com/");
  await delay(3000);//used instead of both network idles because page loads too slowly
  await page.screenshot({path: 'WRServiceIMGs/catalogPage.png', fullPage: true});



//
// let catalogContainer = await page.evaluateHandle(() =>{
//   return document.getElementsByClassName("catalogListViewItems")[0];
// });

//let clickables = await catalogContainer.asElement().$$('button');//contains all clickable buttons in the catalog catalogContainer

//console.log(clickables.length);



/** Populate the buttons array with only 'learn more' buttons **/
//let buttons = [];
  //  for (i = 0; i < clickables.length; i++){


    //   const label = await clickables[i].$eval(() => this.innerText);
       // console.log(clickables[i].innerText);
//console.log(label);
    //  console.log(await (await (clickables[i].getProperty('textContent'))).jsonValue());
      // if(await clickables[i].getProperty('textContent').jsonValue() === 'Learn More'){
      //   buttons.push(clickables[i]);
      // }
//  }



//console.log(buttons.length);




  browser.close();
}

  run();
