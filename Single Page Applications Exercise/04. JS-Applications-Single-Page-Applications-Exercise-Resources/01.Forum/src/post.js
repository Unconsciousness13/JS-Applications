import { setupPostCreateComment, showPostCreateComment } from "./Views/postCreateComment.js"
import { setupPostComments, showPostComments } from "./Views/postComments.js"

let main;
let postCreateSection;
let postCommentsSection;

export function setupPost(mainTarget, sectionCreateTarget, sectionCommentsTarget) {

    main = mainTarget;
    postCreateSection = sectionCreateTarget;
    postCommentsSection = sectionCommentsTarget;

    setupPostCreateComment(postCreateSection);
    setupPostComments(postCommentsSection);
}

export async function showPost(postId) {

    main.innerHTML = '';
    const postCreatePostSect = showPostCreateComment(postId);
    const postCommentsSect = await showPostComments(postId);

    main.appendChild(postCommentsSect);
    main.appendChild(postCreatePostSect);
}