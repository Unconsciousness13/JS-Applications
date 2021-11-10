import { showPost } from "../post.js"
let section;
export function setupPostCreateComment(sectionTarget) {
    section = sectionTarget;

    section.querySelector('form').addEventListener('submit', async(e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const id = section.dataset.id;
        const data = [...formData.entries()].reduce((p, [k, v]) => Object.assign(p, {
            [k]: v
        }), {});
        Object.values(data).forEach(v => {
            if (v == '') {
                throw alert(`All fields must be filled!`)
            }
        })
        const date = new Date().toLocaleString();

        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
            method: 'post',
            headers: { "Content-Type": `application/json` },
            body: JSON.stringify({
                date: date,
                text: data.commentText,
                username: data.username,
                postId: id
            })
        });
        if (!response.ok) {
            const error = await response.json();
            throw alert(error.message);
        }
        e.target.reset();
        showPost(id);
    });
}

export function showPostCreateComment(postId) {

    section.setAttribute('data-id', postId);
    return section;
}