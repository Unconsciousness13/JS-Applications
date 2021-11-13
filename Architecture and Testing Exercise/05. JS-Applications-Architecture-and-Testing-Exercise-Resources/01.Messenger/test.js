const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
let browser, page; // Declare reusable variables

let url = 'http://127.0.0.1:5500/01.Messenger/';

function fakeResponse(data) {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
}

let messagess = {
    1: {
        author: 'Pesho',
        content: 'pesho content'
    },
    2: {
        author: 'Gosho',
        content: 'gosho content'
    }
};

let createMesseges = {
    1: {
        author: 'Pesho',
        content: 'pesho content'
    },
    2: {
        author: 'Gosho',
        content: 'gosho content'
    },
    3: {
        author: 'Misho',
        content: 'misho content',
        _id: 3
    }
};

describe('E2E tests', function() {
    this.timeout(10000)
    before(async() => { browser = await chromium.launch(); });
    // before(async () => { browser = await chromium.launch({ headless: false, slowMo: 1000 }); });
    after(async() => { await browser.close(); });
    beforeEach(async() => { page = await browser.newPage(); });
    afterEach(async() => { await page.close(); });

    describe('get messages', () => {
        it('should call server', async() => {
            await page.route('**/jsonstore/messenger', route => route.fulfill(fakeResponse(messagess)));
            await page.goto(url);

            const [response] = await Promise.all([
                page.waitForResponse('**/jsonstore/messenger'),
                page.click('#refresh'),
            ]);

            let result = await response.json();
            expect(result).to.eql(messagess);

        });

        it('should show data in textArea', async() => {
            await page.route('**/jsonstore/messenger', route => route.fulfill(fakeResponse(messagess)));
            await page.goto(url);

            const [response] = await Promise.all([
                page.waitForResponse('**/jsonstore/messenger'),
                page.click('#refresh'),
            ]);

            let textArea = await page.$eval('#messages', (textArea) => textArea.value);
            let text = Object.values(messagess)
                .map(v => `${v.author}: ${v.content}`)
                .join('\n');

            expect(textArea).to.eql(text);
        });
    });


    describe('create messages', () => {
        it('should call server with correct data', async() => {
            let data = null;
            let expectedResult = {
                author: 'Misho',
                content: 'misho content'
            };

            await page.route('**/jsonstore/messenger', (route, request) => {
                if (request.method().toLowerCase() === 'post') {
                    data = request.postData();
                    route.fulfill(fakeResponse(createMesseges))
                }
            });

            await page.goto(url);
            await page.fill('#author', expectedResult.author);
            await page.fill('#content', expectedResult.content);

            const [response] = await Promise.all([
                page.waitForResponse('**/jsonstore/messenger'),
                page.click('#submit'),
            ]);

            let result = await JSON.parse(data);
            expect(result).to.eql(expectedResult);
        });

        it('should clear form inputs', async() => {
            let data = null;
            let expectedResult = {
                author: 'Misho',
                content: 'misho content'
            };

            await page.route('**/jsonstore/messenger', (route, request) => {
                if (request.method().toLowerCase() === 'post') {
                    data = request.postData();
                    route.fulfill(fakeResponse(createMesseges))
                }
            });

            await page.goto(url);
            await page.fill('#author', expectedResult.author);
            await page.fill('#content', expectedResult.content);

            const [response] = await Promise.all([
                page.waitForResponse('**/jsonstore/messenger'),
                page.click('#submit'),
            ]);

            let authorInput = await page.$eval('#author', el => el.value);
            let contentInput = await page.$eval('#content', el => el.value);

            expect(authorInput).to.eql('');
            expect(contentInput).to.eql('');
        });
    });
});