import { putServerRequest, getServerRequest } from "../utils/request.js"
import { renderDetailsView } from "../views/detailsView.js"

let main;
let section;

export function setupEditView(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    section.querySelector("form").addEventListener("submit", async(e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = [...formData.entries()].reduce((p, [k, v]) => Object.assign(p, {
            [k]: v }), {});
        const userId = sessionStorage.getItem("userId");
        const token = sessionStorage.getItem("userToken");
        const currentMovieId = e.target.dataset.movieid;

        try {

            if (data.title == `` || data.description == `` || data.imageUrl == '') {
                throw Error("Fields must not be empty!");
            }

            await putServerRequest(`http://localhost:3030/data/movies/${currentMovieId}`, token, {
                title: data.title,
                description: data.description,
                img: data.imageUrl,
                _ownerId: userId

            });
            e.target.reset();
            renderDetailsView(currentMovieId);

        } catch (error) {
            e.target.reset();
            alert(error.message)
        }
    });

}

export async function renderEditView(movieId) {
    main.innerHTML = "";
    const movie = await getServerRequest(`http://localhost:3030/data/movies/${movieId}`);

    section.querySelector("form").setAttribute("data-movieid", movieId);
    section.querySelector("input[name=title]").value = movie.title;
    section.querySelector("textarea[name=description]").textContent = movie.description;
    section.querySelector("input[name=imageUrl]").value = movie.img;

    main.appendChild(section);
}