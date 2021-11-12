import * as api from './api/data.js';
import { showSection } from './dom.js';
import { showHomePage } from './home.js';
import { updateUserNav } from './app.js';

const section = document.getElementById('loginSection');
section.remove();
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);


export function showLoginPage() {
    showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');

    await api.login(email, password);
    updateUserNav();
    showHomePage();
}