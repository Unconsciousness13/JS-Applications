import { html, render } from '../node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';
const selectTemplate = (items) => html `
<select id="menu">${items.map(i => html`<option value=${i._id}>${i.text}</option>`)}
</select>`;

const root = document.querySelector('div');
document.querySelector('form').addEventListener('submit', addItem);

getData();

async function getData(){
    const res = await fetch(url);
    const data = await res.json();

    update(Object.values(data));
}

function update(items){
    const result = selectTemplate(items);
    render(result, root);
}

async function addItem(ev){
    ev.preventDefault();
    const text = document.getElementById('itemText').value;

    const res = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text})
    });

    if (res.ok) {
        getData();
        document.getElementById('itemText').value = '';
        alert('City added successfully');
    }
    
}