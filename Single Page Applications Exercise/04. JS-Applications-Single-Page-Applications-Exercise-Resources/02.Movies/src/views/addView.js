import { postServerRequest } from "../utils/request.js"
import { renderHomeView } from "../views/homeView.js"

let main;
let section;

export function setupAddView(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    section.querySelector("form").addEventListener("submit", async(e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = [...formData.entries()].reduce((p, [k, v]) => Object.assign(p, {
            [k]: v
        }), {});
        const userId = sessionStorage.getItem("userId");
        const token = sessionStorage.getItem("userToken");

        try {

            if (data.title == `` || data.description == `` || data.imageUrl == '') {
                throw Error("Fields must not be empty!");
            }

            await postServerRequest(`http://localhost:3030/data/movies`, token, {
                title: data.title,
                description: data.description,
                img: data.imageUrl,
                _ownerId: userId

            });

            e.target.reset();
            renderHomeView();

        } catch (error) {
            e.target.reset();
            alert(error.message)
        }
    });

}

export async function renderAddView() {
    main.innerHTML = "";
    main.appendChild(section);
}