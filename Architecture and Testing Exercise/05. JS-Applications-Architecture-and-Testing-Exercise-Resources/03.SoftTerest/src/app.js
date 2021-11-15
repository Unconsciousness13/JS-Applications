import { showSection } from './dom.js';
import { showHomePage } from './views/home.js';
import { showCreatePage } from './views/create.js';
import { showCatalogPage } from './views/catalog.js';
import { showLoginPage } from './views/login.js';
import { showRegisterPage } from './views/register.js';
import { showDetailsPage } from './views/details.js';


const links = {
    'homeLink': 'home',
    'getStartedLink': 'home',
    'catalogLink': 'catalog',
    'loginLink': 'login',
    'registerLink': 'register',
    'createLink': 'create'
};

const views = {
    'home': showHomePage,
    'catalog': showCatalogPage,
    'login': showLoginPage,
    'register': showRegisterPage,
    'create': showCreatePage,
    'details': showDetailsPage

};

const nav = document.querySelector('nav');
nav.addEventListener('click', onNavigate);

const ctx = {
    goTo,
    showSection
};
// start application homeview
goTo('home');

function onNavigate(event) {
    const name = links[event.target.id];
    if (name) {
        event.preventDefault();
        goTo(name);
    }
}

function goTo(name, ...params) {
    const view = views[name];
    if (typeof view == 'function') {
        view(ctx, ...params);
    }
}