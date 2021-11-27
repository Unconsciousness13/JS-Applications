import { page, render } from './lib.js'
import { homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';

/* debug */
Animation
import * as api from './api/data.js';



window.api = api;

const root = document.querySelector('main');

page(decorateContext);
page('/', homePage);
page('/memes', catalogPage);

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);

    next();
}