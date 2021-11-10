import { setupAddPartialView, renderAddPartialView } from "./partialViews/addPartialView.js"
import { setupMoviePartialView, renderMoviePartialView } from "./partialViews/moviePartialView.js"

let main;
let section;

export function setupHomeView(mainTarget, homeSectionTarget, addPartialTargetSection, moviePartialTargetSection) {

    main = mainTarget;
    section = homeSectionTarget;

    setupAddPartialView(addPartialTargetSection);
    setupMoviePartialView(moviePartialTargetSection);
}

export async function renderHomeView() {

    main.innerHTML = ``;
    main.appendChild(section);
    main.appendChild(renderAddPartialView());
    main.appendChild(await renderMoviePartialView());
}