const puppeteer = require('puppeteer')
//const json = require('./sites.json')
const {Cluster} = require('puppeteer-cluster');

//require('events').EventEmitter.defaultMaxListeners = 0

//time delay function
function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

//list of sites
const sites = [
  {
    "sitename": "Champion_Catalog",
    "link": "https://champion.catalogs.dev.workrails.com"
  }, {
    "sitename": "championWR",
    "link": "https://champion.workrails.com"
  }, {
    "sitename": "confluent_Catalog",
    "link": "https://confluent.catalogs.dev.workrails.com/"
  }, {
    "sitename": "confluentWR",
    "link": "https://confluent.workrails.com/"
  }, {
    "sitename": "Erwin_Catalog",
    "link": "https://erwin.catalogs.dev.workrails.com/"
  }, {
    "sitename": "ErwinWR",
    "link": "https://erwin.workrails.com/"
  }, {
    "sitename": "gainsight_catalog",
    "link": "https://gainsight.catalogs.dev.workrails.com/	"
  }, {
    "sitename": "gainsightWR",
    "link": "https://gainsight.workrails.com/"
  }, {
    "sitename": "greenhouse_catalog",
    "link": "https://greenhouse.catalogs.dev.workrails.com/	"
  }, {
    "sitename": "greenhouseWR",
    "link": "https://greenhouse.workrails.com/"
  }, {
    "sitename": "kustomer_dev_catalog",
    "link": "https://kustomer.dev.catalogs.workrails.com/	"
  }, {
    "sitename": "kustomer_catalog",
    "link": "https://kustomer.workrails.com/ "
  }, {
    "sitename": "liveperson_catalog",
    "link": "https://liveperson.catalogs.dev.workrails.com/"
  }, {
    "sitename": "livepersonWR",
    "link": "https://liveperson.workrails.com/"
  }, {
    "sitename": "newsela_catalogs",
    "link": "https://newsela.catalogs.dev.workrails.com/	"
  }, {
    "sitename": "newselaWR",
    "link": "https://newsela.workrails.com/"
  }, {
    "sitename": "ptc_catalog",
    "link": "https://ptc.catalogs.dev.workrails.com/"
  }, {
    "sitename": "ptcWR",
    "link": "https://ptc.workrails.com/"
  }, {
    "sitename": "veeva_catalog",
    "link": "https://veeva.catalogs.dev.workrails.com/ "
  }, {
    "sitename": "veevaWR",
    "link": "https://veeva.workrails.com/"
  }, {
    "sitename": "services_catalog",
    "link": "https://services.catalogs.dev.workrails.com/"
  }, {
    "sitename": "servicesWR",
    "link": "https://services.workrails.com/"
  }, {
    "sitename": "testcatalog_catalog",
    "link": "https://testcatalog.catalogs.dev.workrails.com/"
  }, {
    "sitename": "ceridian_catalog",
    "link": "http://ceridian.catalogs.dev.workrails.com"
  }, {
    "sitename": "namely_catalog",
    "link": "https://namely.catalogs.dev.workrails.com/#/"
  }, {
    "sitename": "autodesk_catalog",
    "link": "https://autodesk.catalogs.dev.workrails.com/#/"
  }
];

async function getImageMobile(obj) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const iPhone = puppeteer.devices['iPhone X'];
  await page.emulate(iPhone);

  await page.goto(obj.link);
  delay(3000);

  var pathname = "WebPageIMG/" + obj.sitename + "_mobile"
  await page.screenshot({path: pathname, fullPage: true});
  browser.close();
  delay(1000)
}

async function getImageDesktop(obj) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.emulate({
    name: 'Desktop 1920x1080',
    viewport: {
      width: 1920,
      height: 1080
    }
  });

  await page.goto(obj.link);

  delay(3000)

  var pathname = "WebPageIMG/" + obj.sitename + "_desktop"
  await page.screenshot({path: pathname, fullPage: true});
  browser.close();
  delay(1000)
}

async function run() {

  sites.forEach(function(site) {
    getImageDesktop(site);
    //  getImageMobile(site);
  });

}

//run();

(async () => {

  //if there are errors when running reduce the max number of concurrency
  const cluster = await Cluster.launch({concurrency: Cluster.CONCURRENCY_CONTEXT, maxConcurrency: 3, monitor: true});

  const screenshotDesktop = async ({page, data: url}) => {

    page.emulate({
      name: 'Desktop 1920x1080',
      viewport: {
        width: 1920,
        height: 1080
      }
    });

    await page.goto(url);
    const path = "WebPageIMG/Desktop/" + url.replace(/[^a-zA-Z]/g, '_') + 'Desktop.png';
    //await page.waitForNavigation({waitUntil: 'networkidle0'});
    await page.waitFor(5000)
    //delay(10000);
    await page.screenshot({path});

  };

  const screenshotMobile = async ({page, data: url}) => {

    const iPhone = puppeteer.devices['iPhone X'];
    await page.emulate(iPhone);

    await page.goto(url);
    const path = "WebPageIMG/Mobile/"+ url.replace(/[^a-zA-Z]/g, '_') + 'Mobile.png';
    //await page.waitForNavigation({waitUntil: 'networkidle0'});
    await page.waitFor(5000)
    //delay(10000);
    await page.screenshot({path});

  };

  sites.forEach(function(site) {
    cluster.queue(site.link, screenshotDesktop);
    cluster.queue(site.link, screenshotMobile);
  });

  await cluster.idle();
  await cluster.close();
})();
