function loadCommits() {
    let usernameInput = document.querySelector('#username');
    let repoInput = document.querySelector('#repo');
    let output = document.querySelector('#commits');

    let url = `https://api.github.com/repos/${usernameInput.value}/${repoInput.value}/commits`;

    fetch(url)
        .then(res => {
            if (res.status === 404) {
                output.querySelectorAll('li').forEach(li => li.remove());
                let li = document.createElement('li');
                li.textContent = `Error: ${res.status} (Not Found)`;
                output.appendChild(li);
                throw new Error('not found');
            } else {
                return res.json();
            }
        })
        .then(data => {
            output.querySelectorAll('li').forEach(li => li.remove());
            data.forEach(obj => {
                let li = document.createElement('li');
                li.textContent = `${obj.commit.author.name}: ${obj.commit.message}`;
                output.appendChild(li);
            });
        });
}