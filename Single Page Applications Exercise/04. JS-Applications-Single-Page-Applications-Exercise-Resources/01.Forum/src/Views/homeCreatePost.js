import { showHome } from "../home.js"
let section;
export function setupHomeCreatePost(sectionTarget) {
    section = sectionTarget;

    section.querySelector('form').addEventListener('submit', async(e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = [...formData.entries()].reduce((p, [k, v]) => Object.assign(p, {
            [k]: v }), {});
        Object.values(data).forEach(v => {
            if (v == '') {
                throw alert(`All fields must be filled!`)
            }
        })
        const date = new Date().toLocaleString();

        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
            method: 'post',
            headers: { "Content-Type": `application/json` },
            body: JSON.stringify({
                title: data.topicName,
                username: data.username,
                post: data.postText,
                date: date,
            })
        });
        if (!response.ok) {
            const error = await response.json();
            throw alert(error.message);
        }

        e.target.reset();
        showHome();
    });
}

export function showHomeCreatePost() {
    return section;
}