import { page } from './lib.js';

page('/', () => console.log('home view'));
page('/details/:id', () => console.log('details view'));
page('/create', () => console.log('create view'));
page('/edit/:id', () => console.log('edit view'));
page('/login', () => console.log('login view'));
page('/register', () => console.log('register view'));
page('/my-furniture', () => console.log('my furniture view'));

page.start();