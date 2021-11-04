function attachEvents() {

    // refresh button button
    const refreshButton = document.getElementById('refresh');
    refreshButton.addEventListener('click', getMessages);

    // send message button
    const sendButton = document.getElementById('submit');
    sendButton.addEventListener('click', onSubmit);

    // calling the function to display the messages without clicking the refresh button
    getMessages()
}
// author name
const authorInput = document.querySelector('[name="author"]');

// author messages
const contentInput = document.querySelector('[name="content"]');

// list of all messages in db displayed in the text area
const list = document.getElementById('messages');

attachEvents();

// add the message 
async function onSubmit() {
    author = authorInput.value.trim();
    content = contentInput.value.trim();

    const result = await createMessage({ author, content });

    contentInput.value = '';
    list.value += '\n' + `${author}: ${content}`;
    // autoscroll to sii if messages are not visible 
    list.scrollTop = list.scrollHeight;

}


// load messages
async function getMessages() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const response = await fetch(url);
    const data = await response.json();

    const messages = Object.values(data);


    list.value = messages.map(m => `${m.author}: ${m.content}`).join('\n');
    // autoscroll to sii if messages are not visible 
    list.scrollTop = list.scrollHeight;

}

// post message

async function createMessage(message) {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    };
    const res = await fetch(url, options);
    const result = await res.json();
    return result

}