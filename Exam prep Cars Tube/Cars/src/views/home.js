import { html } from '../lib.js';
import { getAllCars } from '../api/data.js';


const homeTemplate = () => html `
<section id="main">
    <div id="welcome-container">
        <h1>Welcome To Car Tube</h1>
        <img class="hero" src="/images/car-png.webp" alt="carIntro">
        <h2>To see all the listings click the link below:</h2>
        <div>
            <a href="/all-listing" class="button">Listings</a>
        </div>
    </div>
</section>`;

export async function homePage(ctx) {
    const cars = await getAllCars();
    ctx.render(homeTemplate(cars));
}