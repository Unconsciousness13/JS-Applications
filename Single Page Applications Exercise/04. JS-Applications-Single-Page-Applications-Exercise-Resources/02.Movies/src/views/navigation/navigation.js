import { deleteServerRequest } from "../../utils/request.js";
import { renderHomeView } from "../homeView.js";

export function setupNavigation(nav, links) {

    document.getElementById("logoutBtn").addEventListener("click", async(e) => {

        e.preventDefault();
        const token = sessionStorage.getItem("userToken");

        try {

            await deleteServerRequest(`http://localhost:3030/users/logout`, token);

            sessionStorage.removeItem(`userToken`);
            sessionStorage.removeItem(`userId`);
            sessionStorage.removeItem(`email`);

            setUserNav();
            renderHomeView();

        } catch (error) {
            alert(error.message)
        }
    });

    nav.addEventListener(`click`, (e) => {
        if (e.target.tagName == `A`) {
            const view = links[e.target.id];
            if (typeof view == "function") {
                e.preventDefault();
                view();
            }
        }
    });
}


export function setUserNav() {
    const options = document.querySelector("nav ul").children;

    const token = sessionStorage.getItem("userToken");

    if (token !== null) {

        options[0].children[0].textContent = `Welcome, ${sessionStorage.getItem("email")}`;
        options[1].style.display = "block";
        options[2].style.display = "none";
        options[3].style.display = "none";
    } else {

        options[0].children[0].textContent = `Welcome`;
        options[1].style.display = "none";
        options[2].style.display = "block";
        options[3].style.display = "block";
    }
}