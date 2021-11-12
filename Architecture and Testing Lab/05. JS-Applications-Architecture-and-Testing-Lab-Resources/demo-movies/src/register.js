import { showSection } from './dom.js';
import { showHomePage } from './home.js';
import { updateUserNav } from './app.js';
import { register } from './api/data.js';

const section = document.getElementById('registerSection');
section.remove();
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);


export function showRegisterPage() {
    showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const repass = formData.get('repass').trim();

    if (password != repass) {
        alert('Passwords don\'t match!');
        return;
    }

    await register(email, password);


    updateUserNav();
    showHomePage();

}