import { html } from '../lib.js';
import { deleteCar, getCarById } from '../api/data.js';
import { getUserData } from '../util.js'


const detailsTemplate = (car, isOwner, onDelete) => html `
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${car.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>

        <p class="description-para">${car.description}</p>
        <div class="listings-buttons">
             ${isOwner ? html`<a class="button-list" href="/edit/${car._id}"> Edit</a>
            <button @click=${onDelete} class="button-list">Delete</button>` : null}
        </div>
    </div>
</section>`;


export async function detailsPage(ctx) {
    const car = await getCarById(ctx.params.id)
    const userData = getUserData();
    const isOwner = userData && car._ownerId == userData.id;
    ctx.render(detailsTemplate(car, isOwner, onDelete))
    async function onDelete() {
        const choice = confirm("Are you sure to delete this car?")
        if (choice) {
            await deleteCar(ctx.params.id)
            ctx.page.redirect('/all-listing')
        }
    }
}