const userToken = sessionStorage.getItem(`userToken`);
const email = sessionStorage.getItem(`email`);
const homeButton =
    import { updateCatches } from "./modules.js";

if (userToken != null) {

    document.getElementById(`user`).style.display = `inline-block`;
    document.querySelector(`#addForm .add`).disabled = false;
    document.querySelector(`#catches h3`).textContent = `Click Load to preview catches,\r\nor Add to add catch!`;
    document.querySelector(".email span").textContent = `${email}`;
    document.getElementById(`logoutBtn`).addEventListener(`click`, async(e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3030/users/logout`, {
            method: `get`,
            headers: { "X-Authorization": userToken }
        });

        if (!response.ok) {
            const error = await response.json();
            return alert(error.message);
        }

        sessionStorage.removeItem(`userToken`);
        window.location.pathname = "/05.Fisher-Game/index.html";
    });

    document.querySelector(`#addForm .add`).addEventListener(`click`, async() => {

        const addCatchEl = Array.from(document.getElementById(`addForm`).children);

        let postObj = {};

        for (let i = 2; i < addCatchEl.length; i += 2) {

            const prop = addCatchEl[i].className;

            if (addCatchEl[i].value == ``) {
                throw alert(`All fields must be filled!`);
            }
            postObj[prop] = addCatchEl[i].value;
        }

        const response = await fetch(`http://localhost:3030/data/catches`, {
            method: `post`,
            headers: { "X-Authorization": userToken },
            body: JSON.stringify(postObj)
        })

        if (!response.ok) {
            const error = await response.json();
            return alert(error.message);
        }

        for (let i = 2; i < addCatchEl.length; i += 2) {
            addCatchEl[i].value = ``;
        }

        updateCatches();
    });
} else {
    document.getElementById(`guest`).style.display = `inline-block`;
};

document.querySelector(`.load`).addEventListener(`click`, async() => {

    updateCatches();
});

document.getElementById(`catches`).addEventListener(`click`, async(e) => {

    if (e.target.className == `update` && e.target.disabled == false) {

        const inputs = Array.from(e.target.parentElement.children);
        let postObj = {};

        for (let i = 1; i < inputs.length - 1; i += 3) {

            const prop = inputs[i].className;

            if (inputs[i].value == ``) {
                throw alert(`All fields must be filled!`);
            }

            postObj[prop] = inputs[i].value;
        }
        console.log(postObj);
        const response = await fetch(`http://localhost:3030/data/catches/${e.target.parentElement.id}`, {
            method: `put`,
            headers: {
                "Content-Type": `application/json`,
                "X-Authorization": userToken
            },
            body: JSON.stringify(postObj)
        });

        if (!response.ok) {
            const error = await response.json();
            return alert(error.message);
        }

        updateCatches();
    } else if (e.target.className == `delete` && e.target.disabled == false) {
        const message = confirm('Are you sure you want to delete the catch?');
        if (message) {
            await fetch(`http://localhost:3030/data/catches/${e.target.parentElement.id}`, {
                method: `delete`,
                headers: { "X-Authorization": userToken }
            });

            e.target.parentElement.remove();
        }
    }
});