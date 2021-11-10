import { e } from "../../utils/render.js"
import { getServerRequest } from "../../utils/request.js"
import { renderDetailsView } from "../detailsView.js"

let section;

export function setupMoviePartialView(sectionTarget) {

    section = sectionTarget;

    section.addEventListener("click", (e) => {

        if (e.target.tagName == "BUTTON") {
            const currentMovieId = e.target.id;
            renderDetailsView(currentMovieId);
        }
    });
}

export async function renderMoviePartialView() {

    section.querySelector("#movieList").innerHTML = "";
    const movies = await getServerRequest("http://localhost:3030/data/movies");

    Object.values(movies).forEach(m => {

        const movieEl = e("div", { className: "card mb-4" },
            e("img", { className: "card-img-top", src: m.img, alt: "Card image cap", width: "400" }),
            e("div", { className: "card-body" },
                e("h4", { className: "card-title" }, m.title)),
            e("div", { className: "card-footer" },
                e("a", { href: "#/details/6lOxMFSMkML09wux6sAF" },
                    e("button", { type: "button", className: "btn btn-info", id: `${m._id}` }, "Details")
                )
            )
        )

        section.querySelector("#movieList").appendChild(movieEl);
    });

    return section;
}