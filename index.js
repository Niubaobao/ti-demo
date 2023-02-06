import puppeteer from "puppeteer";

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: "./myUserDataDir",
  });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
  );

  await page.evaluateOnNewDocument(() => {
    window.navigator.chrome = {
      runtime: {},
      loadTimes: function () {},
      csi: function () {},
      app: {},
    };
  });

  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, "webdriver", {
      get: () => false,
    });
  });

  await page.goto("https://www.ti.com.cn/product/cn/LMR38020-Q1");

  // Set screen size
  await page.setViewport({ width: 1960, height: 1024 });

  // Type into search box
  //   await page.type('.search-box__input', 'automate beyond recorder');

  // Wait and click on first result
  const orderTableAllSelector = "text/登录以查看库存";
  const loginSelector = "text/登录/注册";

  await page.waitForSelector(orderTableAllSelector);

  await page.waitForSelector(loginSelector);

  await delay(770);

  await page.click(loginSelector);

  await delay(1070);

  await page.waitForSelector("#username");

  await page.type("#username", "451142214", { delay: 923 });
  await page.type("#username", "@qq.com", { delay: 523 });

  await delay(1211);

  await page.click("text/下一步");

  await page.type('input[name="password"]', "Liuwei@hero1314", { delay: 401 });

  await delay(123);

  //loginbutton
  await page.click("#loginbutton");
  //   await browser.close();
})();
