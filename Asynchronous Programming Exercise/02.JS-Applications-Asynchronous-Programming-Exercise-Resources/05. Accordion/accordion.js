function solution() {
    const mainDiv = document.getElementById('main');

    // async function takeParagraphContent(id) {
    //     console.log(id)
    //     const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
    //     const res = await fetch(url);
    //     const data = await res.json();

    //     return data;
    // }

    async function getArticles() {
        const url = 'http://localhost:3030/jsonstore/advanced/articles/list'
        const res = await fetch(url);
        const data = await res.json();


        data.forEach(obj => {
            const searchId = obj._id;

            const divAccordion = document.createElement('div');
            divAccordion.className = 'accordion';
            mainDiv.appendChild(divAccordion);

            const divHead = document.createElement('div');
            divHead.className = 'head';
            divAccordion.appendChild(divHead);

            const headSpan = document.createElement('span');
            headSpan.textContent = `${obj.title}`
            divHead.appendChild(headSpan);

            const moreButton = document.createElement('button');
            moreButton.className = 'button';
            moreButton.id = searchId
            moreButton.textContent = 'More';
            divHead.appendChild(moreButton);

            moreButton.addEventListener('click', showHidden)

            // extra content
            const divExtra = document.createElement('div');
            divExtra.className = 'extra';
            divExtra.style.display = 'none'

            const moreContent = document.createElement('p');

            // moreContent.textContent = takeParagraphContent(searchId);
            divExtra.appendChild(moreContent);

            divAccordion.appendChild(divExtra);


            function showHidden() {
                if (moreButton.textContent === 'More') {
                    fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${searchId}`)
                        .then(res => res.json())
                        .then(extraContent => {
                            moreContent.textContent = extraContent.content;
                            moreButton.textContent = 'Less';
                            divExtra.style.display = 'block';
                        });
                } else {
                    moreContent.textContent = '';
                    moreButton.textContent = 'More';
                    divExtra.style.display = 'none';
                }
            }



        });

    }
    getArticles();
}