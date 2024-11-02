const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors"); // Import the CORS package
const app = express();

let htmlContent;

// Enable CORS for all routes
app.use(cors());

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://moro-store.zbooni.com", { waitUntil: "networkidle2" });

    htmlContent = await page.content();

    await browser.close();
})();

app.get("/", (req, res) => {
    if (htmlContent) {
        res.send(htmlContent);
    } else {
        res.send("Content is not ready yet. Please try again shortly.");
    }
});

app.listen(4000, () => console.log("Listening on http://localhost:4000"));