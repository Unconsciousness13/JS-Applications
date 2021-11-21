import { html } from '../lib.js';


const catalogTemplate = () => html `
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>
<div class="row space-top">

</div>`;

const itemTemplate = () => html `<div class="row space-top">
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src="./images/table.png" />
            <p>Description here</p>
            <footer>
                <p>Price: <span>235 $</span></p>
            </footer>
            <div>
                <a href="/details/123" class="btn btn-info">Details</a>
            </div>
        </div>
    </div>
</div>`;

export function catalogPage(ctx) {
    ctx.render(catalogTemplate());
}