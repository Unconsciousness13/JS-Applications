import { e } from "../dom.js"

let section;

export function setupPostComments(sectionTarget) {
    section = sectionTarget;
}

export async function showPostComments(postId) {

    const post = await getCurrentPost(postId);
    const comments = await getComments(postId);

    mannipulateHeaderSection(post);
    manipulateCommentsSection(comments);

    return section;

    async function getCurrentPost(postId) {

        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts/' + postId);
        const result = await response.json();

        return result;
    }
    async function getComments(postId) {

        const response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments/`);
        const result = await response.json();

        let needed = Object.values(result).filter(c => c.postId == postId);
        return needed;
    }

    function mannipulateHeaderSection(post) {

        section.querySelector('#postName h2').textContent = `${post.title}`;
        section.querySelector('#currPostUserName').textContent = `${post.username}`;
        section.querySelector('#currPostDate').textContent = `${post.date}`;
        section.querySelector('.post-content').textContent = `${post.post}`;
    }

    function manipulateCommentsSection(comments) {

        section.querySelector(`#commentSection`).innerHTML = ``;

        comments.forEach(c => {
            const comment = e('div', { id: "user-comment" },
                e('div', { className: "topic-name-wrapper" },
                    e('div', { className: "topic-name" },
                        e('p', {}, e('strong', {}, `${c.username}`), ' commented on ', e('time', {}, `${c.date}`)),
                        e('div', { className: "post-content" },
                            e('p', {}, `${c.text}`)
                        )
                    )
                )
            )

            section.querySelector(`#commentSection`).appendChild(comment);
        });
    }
}