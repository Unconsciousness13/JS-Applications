import { createComment, deleteGame, getAllCommentsForASpecificGame, getGameById } from "../api/data.js";
import { getUserData } from "../util.js";
import { html } from "../lib.js";
let localCtx;
const detailsTemplate = (game, isOwner, comments) => html `
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
    <div class="details-comments">
      <h2>Comments:</h2>
      ${comments.length != 0 
        ? html`<ul>${comments.map(commentTemplate)}</ul>` 
        : html`<p class="no-comment">No comments.</p>`}
    </div>
    ${isOwner
      ? html`<div class="buttons">
          <a href="/edit/${game._id}" class="button">Edit</a>
          <a @click=${onDelete} href="javascript:void(0)" class="button"
            >Delete</a
          >
        </div>`
      : null}
  </div>
    ${!isOwner 
      ? commentSection(isOwner, getUserData())
      : null}
</section>`;


const commentSection = (isOwner, isUser) => html`
${!isOwner && isUser ? 
    html`
    <article class="create-comment">
        <label>Add new comment:</label>
        <form  @submit=${onComment} class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>` 
    :
    null}`;

const commentTemplate = (comment) => html`
<li class="comment">
  <p>Content: ${comment.comment}</p>
</li>`;

export async function detailsPage(ctx) {
  localCtx = ctx
  let [game, comments] = await Promise.all([getGameById(ctx.params.id), getAllCommentsForASpecificGame(ctx.params.id)]);
  const userData = getUserData();
  const isOwner = userData && userData.id == game._ownerId;
  
    ctx.render(detailsTemplate(game, isOwner, comments));
  
}


async function onDelete(){
  const confirmation = confirm('Are you sure you want to delete this game?')
  if(confirmation){
      await deleteGame(localCtx.params.id);
      localCtx.page.redirect('/');
  }
}

async function onComment(event){
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const comment = formData.get('comment').trim();
  if(!comment){
      return alert('Comment can not be empty!')
  }
  const body = {
      gameId: localCtx.params.id,
      comment: comment
  }
  try{
      await createComment(body)
  }
  catch(err){
      alert(err.message);
  }
  form.reset();
  localCtx.page.redirect('/details/'+localCtx.params.id)
}