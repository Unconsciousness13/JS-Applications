import { html } from '../lib.js';
import { getAllAlbums } from '../api/data.js';
import { getUserData } from '../util.js';

const catalogueTemplate = (albums) => html `
<section id="catalogPage">
    <h1>All Albums</h1>
    ${albums.length == 0 
        ? html`<h3 class="no-articles">No Albums in Catalog!</h3>` 
        : html`<div class="card-box">
            ${albums.map(albumPreview)}
        </div>`}
</section>`;


const albumPreview = (album) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        <div class="btn-group">
            ${detailsButton(album)}
        </div>
    </div>
</div>`;


function detailsButton(album) {
    const userData = getUserData()
    if (userData){
        return html`
        <div class="btn-group">
        <a href="/details/${album._id}" id="details">Details</a>
        </div>`
    }
    
}

export async function allListingPage(ctx) {
    const userData = getUserData();
    const album = await getAllAlbums();
    ctx.render(catalogueTemplate(album,userData));

}