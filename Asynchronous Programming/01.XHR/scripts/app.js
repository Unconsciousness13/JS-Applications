// we have to add id load in to the button in index.html file


function loadRepos() {
    let button = document.querySelector('#load');
    button.addEventListener('click', function loadRepos() {
        let url = 'https://api.github.com/users/testnakov/repos';
        const httpRequest = new XMLHttpRequest();
        httpRequest.addEventListener('readystatechange', function() {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                document.getElementById('res').textContent = httpRequest.responseText;
            }
        });
        httpRequest.open('GET', url);
        httpRequest.send();
    });

}

// way without adding the id load

function loadRepos() {
    const url = 'https://api.github.com/users/testnakov/repos';

    const httpRequest = new XMLHttpRequest();
    httpRequest.addEventListener('readystatechange', () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            document.getElementById('res').textContent = httpRequest.responseText;
        }
    });

    httpRequest.open('GET', url);
    httpRequest.send();
}