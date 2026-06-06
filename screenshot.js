const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  const pages = ["/status", "/pricing", "/admin", "/share"];
  for (const path of pages) {
    await page.goto("http://localhost:3000" + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "content/screenshots/" + path.replace("/", "") + ".png", fullPage: true });
    console.log(path + " screenshot saved");
  }
  
  await browser.close();
  console.log("All screenshots done!");
})();