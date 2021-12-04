import { page, render } from './lib.js';
import { homePage } from './views/home.js'
import { loginPage } from './views/login.js';
import { getUserData } from '../src/util.js'
import { logout } from './api/api.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { allListingPage } from './views/catalogue.js';

const root = document.querySelector('#main-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);


page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/catalogue', allListingPage);

updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

export function updateUserNav() {
    const userData = getUserData();
    if (userData) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('user1').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
        document.getElementById('guest1').style.display = 'none';
        // document.querySelector('#profile a').textContent = `Welcome ${userData.username}`

    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('user1').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('guest1').style.display = 'inline-block';
    }
}

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}