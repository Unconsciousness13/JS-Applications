const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page; // Declare reusable variables


describe('E2E tests', function() {
    before(async() => { browser = await chromium.launch(); });
    after(async() => { await browser.close(); });
    beforeEach(async() => { page = await browser.newPage(); });
    afterEach(async() => { await page.close(); });

    it('initial load', async() => {
        page.goto('http://localhost:5500');
    });
});