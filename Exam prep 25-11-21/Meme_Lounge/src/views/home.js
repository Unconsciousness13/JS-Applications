import { html } from '../lib.js';


const homeTemplate = () => html `
<section id="welcome">
    <div id="welcome-container">
        <h1>Welcome To Meme Lounge</h1>
        <img src="/images/welcome-meme.jpg" alt="meme">
        <h2>Login to see our memes right away!</h2>
        <div id="button-div">
            <a href="#" class="button">Login</a>
            <a href="#" class="button">Register</a>
        </div>
    </div>
</section>`;

export function homePage(ctx) {
    ctx.render(homeTemplate());
}