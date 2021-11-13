const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page; // Declare reusable variables

let url = 'http://127.0.0.1:5500/02.Book-Library/';

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

const books = {
    1: {
        author: 'Myself',
        title: 'Django framework'
    },
    2: {
        author: 'Anonymous',
        title: 'How to hack a server with Python'
    }
}

const createBook = {
    1: {
        author: 'Victor',
        title: 'Python > C#'
    },
    2: {
        author: 'Doncho',
        title: 'Python master'
    },
    3: {
        author: 'Ines',
        title: 'Next Python master',
        _id: 3
    }
}

let updateBook = {
    author: 'Victor Reloading',
    title: 'Python is x2 > C#',
}

function createRow([id, book]) {
    const result = `
    <tr data-id="${id}">
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        </td>
    </tr>`;
    return result;
}



describe('E2E tests', function() {
    this.timeout(10000)
    before(async() => { browser = await chromium.launch(); });
    after(async() => { await browser.close(); });
    beforeEach(async() => { page = await browser.newPage(); });
    afterEach(async() => { await page.close(); });

    describe('load books', () => {
        it('should get all the books from server', async() => {
            await page.route('**/jsonstore/collections/books', route => route.fulfill(fakeResponse(books)));
            await page.goto(url);

            const [response] = await Promise.all([
                page.waitForResponse('**/jsonstore/collections/books'),
                page.click('#loadBooks'),
            ]);

            let result = await response.json();
            expect(result).to.eql(books);
        });


    });

    describe('add book', () => {
        it('should call server with correct data', async() => {
            let data = null;
            let expectedResult = {
                author: 'next',
                title: 'star wars'
            };

            await page.route('**/jsonstore/collections/books', (route, request) => {
                if (request.method().toLowerCase() === 'post') {
                    data = request.postData();
                    route.fulfill(fakeResponse(createBook))
                }
            });

            await page.goto(url);
            await page.fill('#createForm input[name="author"]', expectedResult.author);
            await page.fill('#createForm input[name="title"]', expectedResult.title);

            const [response] = await Promise.all([
                page.waitForResponse('**/jsonstore/collections/books'),
                page.click('#createForm button'),
            ]);

            let result = await JSON.parse(data);
            expect(result).to.eql(expectedResult);
        });


    });
    describe('edit book', () => {
        it('should update server with correct data', async() => {
            let data = null;
            let expectedResult = {
                author: 'Victor Reloading',
                title: 'Python is x2 > C#',
                _id: 3
            };

            await page.route('**/jsonstore/collections/books' + expectedResult._id, (route, request) => {
                if (request.method().toLowerCase() === 'put') {
                    data = request.putData();
                    route.fulfill(fakeResponse(updateBook))
                }
            });

            await page.goto(url);

            const [res] = await Promise.all([
                page.waitForResponse('**/jsonstore/collections/books'),
                page.click('#loadBooks'),
                page.click('.editBtn'),
            ]);

            let result = await JSON.parse(data);
            expect(result).to.eql(updateBook);
        });


    });

});