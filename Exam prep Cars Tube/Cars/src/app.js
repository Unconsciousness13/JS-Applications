import { page, render } from './lib.js';
import { homePage } from './views/home.js'
import { loginPage } from './views/login.js';
import { getUserData } from '../src/util.js'
import { logout } from './api/api.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { myCarsPage } from './views/my-listing.js';
import { allListingPage } from './views/all-listing.js';
import { searchPage } from './views/byYear.js'

const root = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);


page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/my-listing', myCarsPage);
page('/all-listing', allListingPage);
page('/by-year', searchPage)

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
        document.getElementById('profile').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#profile a').textContent = `Welcome ${userData.username}`

    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}