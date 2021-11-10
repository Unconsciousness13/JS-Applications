import { renderAddView } from "../addView.js"

let section;
export function setupAddPartialView(sectionTarget) {

    section = sectionTarget;

    section.querySelector("a").addEventListener("click", (e) => {
        e.preventDefault();
        renderAddView();
    });
}

export function renderAddPartialView() {

    const token = sessionStorage.getItem("userToken");

    if (token !== null) {
        section.style.display = "block";
    } else {
        section.style.display = "none";
    }

    return section;
}