import { setupHome, showHome } from "../src/home.js"
import { setupPost, showPost } from "../src/post.js"

main();

function main() {

    const nav = document.querySelector('nav');
    const main = document.querySelector('main');
    const homeCreateSection = document.querySelector(`#homeCreateSection`);
    const homeCommentsSection = document.querySelector(`#homeCommentsSection`);
    const postDisplayCommentsSection = document.querySelector(`#postDisplayCommentsSection`);
    const postSubmitCommentsSection = document.querySelector(`#postSubmitCommentSection`);

    const links = {
        "homeLink": showHome,
    }

    setupHome(main, homeCreateSection, homeCommentsSection)
    setupPost(main, postSubmitCommentsSection, postDisplayCommentsSection)

    setupNavigation();

    showHome();

    function setupNavigation() {
        nav.addEventListener(`click`, (e) => {
            if (e.target.tagName == 'A') {
                const view = links[e.target.id]
                if (typeof view == "function") {
                    e.preventDefault();
                    view();
                }
            }
        });
    }
}