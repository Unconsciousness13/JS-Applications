function solve() {
    document.querySelector('#searchBtn').addEventListener('click', onClick);

    function onClick() {
        //   TODO:

    }
}

import { html, render } from '../node_modules/lit-html/lit-html.js';

const studentRow = (student) => html `<tr>
<td>${student.firstName} ${student.lastName}</td>
<td>${student.email}</td>
<td>${student.course}</td>
</tr>`;

let data;

start();

async function start() {
    const res = await fetch('http://localhost:3030/jsonstore/advanced/table');
    data = Object.values(await res.json());

    update();
}


function update() {
    render(data.map(studentRow), document.querySelector('tbody'));
}