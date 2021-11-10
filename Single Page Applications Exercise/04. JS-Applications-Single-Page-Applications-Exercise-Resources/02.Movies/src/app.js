import { setupNavigation, setUserNav } from "./views/navigation/navigation.js"
import { setupHomeView, renderHomeView } from "./views/homeView.js"
import { setupLoginView, renderLoginView } from "./views/loginView.js"
import { setupRegisterView, renderRegisterView } from "./views/registerView.js"
import { setupAddView } from "./views/addView.js"
import { setupDetailsView } from "./views/detailsView.js"
import { setupEditView } from "./views/editView.js"

initialization();

function initialization() {

    const nav = document.querySelector("nav");
    const main = document.querySelector("main");
    const homeSection = document.querySelector("#home-page");
    const addPartialSection = document.querySelector("#add-movie-button");
    const moviePartialSection = document.querySelector("#movie");
    const loginSection = document.querySelector("#form-login");
    const registerSection = document.querySelector("#form-sign-up");
    const addSection = document.querySelector("#add-movie");
    const detailsSection = document.querySelector("#movie-example");
    const editSection = document.querySelector("#edit-movie");

    const links = {
        "homeLink": renderHomeView,
        "loginLink": renderLoginView,
        "registerLink": renderRegisterView,
    }

    setUserNav();
    setupNavigation(nav, links);

    setupHomeView(main, homeSection, addPartialSection, moviePartialSection);
    setupLoginView(main, loginSection);
    setupRegisterView(main, registerSection);
    setupAddView(main, addSection);
    setupDetailsView(main, detailsSection);
    setupEditView(main, editSection);



    //start app
    renderHomeView();

}