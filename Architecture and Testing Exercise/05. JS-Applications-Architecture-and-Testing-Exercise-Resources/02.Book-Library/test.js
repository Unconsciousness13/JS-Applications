const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
let browser, page; // Declare reusable variables
describe('E2E tests', async function() {
    this.timeout(6000)
    before(async() => { browser = await chromium.launch({ headless: false, slowMo: 1000 }); });
    after(async() => { await browser.close(); });
    beforeEach(async() => { page = await browser.newPage(); });
    afterEach(async() => { await page.close(); });
    it('loads static page with button "Load all books"', async function() {
        await page.goto('http://localhost:5500/02.Book-Library/index.html');
        await page.click('text=LOAD ALL BOOKS')
        const content = await page.$eval('tbody tr', (tr) => tr.textContent)
        expect(content).includes('Edit')
        expect(content).includes('Delete')

    });
    it('Deletes book', async function() {
        await page.goto('http://localhost:5500/02.Book-Library/index.html');
        await page.click('text=LOAD ALL BOOKS')
        page.on('dialog', dialog => dialog.accept());
        const [request] = await Promise.all([
            page.waitForRequest(request => request.url().includes('/collections/books') && request.method() === 'DELETE'),
            page.click('text=Delete')
        ]);
        const postData = JSON.parse(request.postData())
        expect(postData).to.null
    });
    it('Add book', async function() {
        await page.goto('http://localhost:5500/02.Book-Library/index.html');
        const title = 'Python > C#'
        const author = 'Doncho Minkov'
        await page.fill('[name="title"]', title)
        await page.fill('[name="author"]', author)
        const [response] = await Promise.all([
            page.waitForRequest(request => request.url().includes('/collections/books') && request.method() === 'POST'),
            page.click('text=Submit'),
        ]);

        const postData = JSON.parse(response.postData())
        expect(postData.author).to.equal(author)
    })
    it('Edit book', async function() {
        await page.goto('http://localhost:5500/02.Book-Library/index.html');
        await page.click('text=LOAD ALL BOOKS')
        await page.click('text = Edit')
        this.timeout(6000)
        await page.textContent('body:has(form#editForm)');
        const name = await page.textContent('input[name="title"]');
        const [response] = await Promise.all([
            page.waitForRequest(request => request.url().includes('/collections/books') && request.method() === 'PUT'),
            page.click('text=Save'),
        ]);

        const postData = JSON.parse(response.postData())
        expect(postData.title).to.contains(name)
        console.log(name)
    })
})