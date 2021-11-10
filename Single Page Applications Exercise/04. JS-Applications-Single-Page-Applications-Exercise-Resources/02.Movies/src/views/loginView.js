import { postServerLoginRequest } from "../utils/request.js"
import { setUserNav } from "../views/navigation/navigation.js"
import { renderHomeView } from "../views/homeView.js"

let main;
let section;

export function setupLoginView(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    section.querySelector("form").addEventListener("submit", async(e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = [...formData.entries()].reduce((p, [k, v]) => Object.assign(p, {
            [k]: v }), {});

        try {

            if (data.email == `` || data.password == ``) {
                throw Error("Fields must not be empty!");
            }

            const responseData = await postServerLoginRequest(`http://localhost:3030/users/login`, { email: data.email, password: data.password });
            sessionStorage.setItem(`userToken`, responseData.accessToken);
            sessionStorage.setItem(`userId`, responseData._id);
            sessionStorage.setItem(`email`, responseData.email);

            e.target.reset();
            setUserNav();
            renderHomeView();

        } catch (error) {
            alert(error.message)
        }
    })

}

export async function renderLoginView() {
    main.innerHTML = "";
    main.appendChild(section);
}