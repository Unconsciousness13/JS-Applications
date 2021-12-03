import { html } from '../lib.js';
import { deleteGame, getGameById } from '../api/data.js';
import { getUserData } from '../util.js'


const detailsTemplate = (game, isOwner, onDelete) => html `
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">${game.summary}</p>


        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        <div class="buttons">
        ${isOwner ? html`<a href="/edit/${game._id}" class="button">Edit</a>
            <a @click=${onDelete} class="button">Delete</a>` : null}
        </div>
    </div>
    
</section>`;



export async function detailsPage(ctx) {
    const game = await getGameById(ctx.params.id)
    const userData = getUserData();
    const isOwner = userData && game._ownerId == userData.id;
    ctx.render(detailsTemplate(game, isOwner, onDelete))
    async function onDelete() {
        const choice = confirm("Are you sure to delete this game?")
        if (choice) {
            await deleteGame(ctx.params.id)
            ctx.page.redirect('/')
        }
    }
}