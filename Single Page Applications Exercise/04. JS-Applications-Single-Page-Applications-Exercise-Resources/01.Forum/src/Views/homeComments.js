import { e } from "../dom.js"
import { showPost } from "../post.js"

let section;

export function setupHomeCommentPosts(sectionTarget) {
    section = sectionTarget;
}

export async function showHomeCommentPosts() {

    section.innerHTML = '';
    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
    const posts = await response.json();

    Object.values(posts).forEach(post => {

        const element = e('div', { className: "topic-container" },
            e('div', { className: "topic-name-wrapper" },
                e('div', { className: "topic-name" },
                    e('a', { href: "#", className: "normal", onClick: () => showPost(post._id) },
                        e('h2', {}, `${post.title}`),
                        e('div', { className: "columns" },
                            e('div', {},
                                e('p', {}, "Date: ",
                                    e('time', {}, `${post.date}`)),
                                e('div', { className: "nick-name" },
                                    e('p', {}, "Username: ",
                                        e('span', {}, `${post.username}`)),
                                )
                            )
                        )
                    )
                )
            )
        )
        section.appendChild(element);
    })

    return section;
}