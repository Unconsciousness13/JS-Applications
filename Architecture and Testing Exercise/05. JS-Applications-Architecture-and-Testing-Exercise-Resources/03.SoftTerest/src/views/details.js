import { e } from '../dom.js';
import { getById } from '../api/data.js';


const section = document.getElementById('detailsPage');
section.remove();


export async function showDetailsPage(ctx, id) {
    ctx.showSection(section);
    loadIdea(id);
}

async function loadIdea(id) {
    const idea = await getById(id);

    section.replaceChildren(createIdeaDiv(idea));
}

function createIdeaDiv(idea) {
    const fragment = document.createDocumentFragment();

    fragment.appendChild(e('img', { className: 'det-img', src: idea.img }));
    fragment.appendChild(e('div', { className: 'desc' },
        e('h2', { className: 'display-5' }, idea.title),
        e('p', { className: 'infoType' }, 'Description:'),
        e('p', { className: 'idea-description' }, idea.description)));

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData && userData.id == idea._ownerId) {
        fragment.appendChild(e('div', { className: 'text-center' },
            e('a', { className: 'btn detb', href: '' }, 'Delete')
        ));
    }


    return fragment;
}