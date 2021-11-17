import { contacts } from './contacts.js';
import { html, render } from 'https://unpkg.com/lit-html?module';

const contactTemplate = (data, onRender) => html `
<div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${data.name}</h2>
        <button class="detailsBtn" @click=@{onRender}>Details</button>
        <div class="details" id=${data.id}>
            <p>Phone number: ${data.phoneNumber}</p>
            <p>Email: ${data.email}</p>
        </div>
    </div>
</div>`;

start();

function start() {
    const container = document.getElementById('contacts');
    onRender();

    function onRender() {
        render(contacts.map(c => contactTemplate(c, onRender)), container);
    }

}