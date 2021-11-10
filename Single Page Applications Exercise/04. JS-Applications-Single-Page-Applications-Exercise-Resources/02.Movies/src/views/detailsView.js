import { getAuthServerRequest, getServerRequest, postServerRequest, deleteServerRequest } from "../utils/request.js"
import { renderHomeView } from "../views/homeView.js"
import { renderEditView } from "../views/editView.js"

let main;
let section;

export function setupDetailsView(mainTarget, homeSectionTarget) {

    main = mainTarget;
    section = homeSectionTarget;

    section.querySelector(".btn.btn-danger").addEventListener("click", async(e) => {
        e.preventDefault();

        const token = sessionStorage.getItem("userToken");
        const currMovieId = section.querySelector("h1").dataset.currentmovieid;

        if (confirm("Are you sure you want to delete the movie?")) {

            try {
                await deleteServerRequest(`http://localhost:3030/data/movies/${currMovieId}`, token);

                renderHomeView();

            } catch (error) {
                alert(error.message)
            }
        }
    });

    section.querySelector(".btn.btn-primary").addEventListener("click", async(e) => {
        e.preventDefault();

        const currMovieId = section.querySelector("h1").dataset.currentmovieid;
        const currMovieOwnerId = section.querySelector("h1").dataset.currentownerid;

        try {

            const currentOwnerSession = sessionStorage.getItem("userId");

            if (currentOwnerSession == currMovieOwnerId) {
                throw Error("You can not like your own movie!")
            } else {
                const token = sessionStorage.getItem("userToken");
                const like = await getAuthServerRequest(`http://localhost:3030/data/likes?where=movieId%3D%22${currMovieId}%22%20and%20_ownerId%3D%22${currentOwnerSession}%22`, token);

                if (like.length == 1) {
                    throw Error("You can not like the movie twice!");
                }

                await postServerRequest(`http://localhost:3030/data/likes`, token, {
                    movieId: currMovieId,
                    _ownerId: currentOwnerSession
                });

                const likesCount = await getServerRequest(`http://localhost:3030/data/likes?where=movieId%3D%22${currMovieId}%22&distinct=_ownerId&count`);
                section.querySelector(".enrolled-span").textContent = `Liked ${likesCount}`;
            }
        } catch (error) {
            alert(error.message)
        }
    });

    section.querySelector(".btn.btn-warning").addEventListener("click", async(e) => {
        e.preventDefault();
        const currMovieId = section.querySelector("h1").dataset.currentmovieid;
        renderEditView(currMovieId);
    });
}

export async function renderDetailsView(movieId) {

    main.innerHTML = "";
    const movie = await getServerRequest(`http://localhost:3030/data/movies/${movieId}`);
    const likesCount = await getServerRequest(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`);

    section.querySelector("h1").setAttribute("data-currentmovieid", movieId);
    section.querySelector("h1").setAttribute("data-currentownerid", movie._ownerId);
    section.querySelector("h1").textContent = `Movie title: ${movie.title}`;
    section.querySelector("img").src = movie.img;
    section.querySelector(".col-md-4.text-center").children[1].textContent = movie.description;
    section.querySelector(".enrolled-span").textContent = `Liked ${likesCount}`;

    setupButtons(movie);
    main.appendChild(section);

    function setupButtons(movie) {

        const currOwnerSession = sessionStorage.getItem("userId");
        const token = sessionStorage.getItem("userToken");

        if (token !== null) {

            if (currOwnerSession == movie._ownerId) {
                section.querySelector(".btn.btn-danger").style.display = "inline-block";
                section.querySelector(".btn.btn-warning").style.display = "inline-block";
                section.querySelector(".btn.btn-primary").style.display = "inline-block";
            } else {
                section.querySelector(".btn.btn-danger").style.display = "none";
                section.querySelector(".btn.btn-warning").style.display = "none";
                section.querySelector(".btn.btn-primary").style.display = "inline-block";
            }
        } else {
            section.querySelector(".btn.btn-danger").style.display = "none";
            section.querySelector(".btn.btn-warning").style.display = "none";
            section.querySelector(".btn.btn-primary").style.display = "none";
        }
    }
}