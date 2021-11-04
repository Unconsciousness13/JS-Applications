function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadContacts);
    document.getElementById('btnCreate').addEventListener('click', onCreate);

    list.addEventListener('click', onDelete);
}

const list = document.getElementById('phonebook');
const personInput = document.getElementById('person');
const numberInput = document.getElementById('phone');



attachEvents();


async function loadContacts() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const res = await fetch(url);
    const data = await res.json();

    list.replaceChildren(...Object.values(data).map(createItem));


}

function createItem(contact) {
    const liElement = document.createElement('li');
    const allContent = `${contact.person}: ${contact.phone} <button data-id="${contact._id}">Delete</button>`;
    liElement.innerHTML = allContent;

    return liElement;
}

async function onCreate() {
    const person = personInput.value;
    const phone = numberInput.value;
    const contact = ({ person, phone });

    const result = await createContact(contact);

    list.appendChild(createItem(result));


}

async function createContact(contact) {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const res = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)

    });
    const result = await res.json();

    return result;

}

async function deleteContact(id) {
    const res = await fetch('http://localhost:3030/jsonstore/phonebook/' + id, {
        method: 'delete'
    });
    const result = res.json();

    return result;
}

async function onDelete(event) {
    const id = event.target.dataset.id;
    if (id != undefined) {
        await deleteContact(id)
        event.target.parentElement.remove();
    }
}