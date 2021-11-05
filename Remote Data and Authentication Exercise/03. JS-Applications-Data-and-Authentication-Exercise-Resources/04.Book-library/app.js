function attachEvents() {
    fetchAllBooks();
    let loadBtn = document.getElementById("loadBooks")
    loadBtn.addEventListener("click", fetchAllBooks);
    let tbody = document.querySelector("tbody");

    let createForm = document.getElementsByTagName("form")[0];
    let authorInput = document.getElementById("author");
    let titleInput = document.getElementById("title");
    let hForm = createForm.querySelector("h3");

    //create invisible save button for the updates
    let saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.style.display = "none";
    createForm.appendChild(saveButton)

    let createButton = createForm.querySelector("button");
    createButton.addEventListener("click", function(event) {
        event.preventDefault();
        let author = authorInput.value;
        let title = titleInput.value;
        createNewBook(author, title);
    });


    function fetchAllBooks() {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:3030/jsonstore/collections/books", requestOptions)
            .then(response => response.json())
            .then(result => populateTable(result))
            .catch(error => alert("No books available"));
    }


    function populateTable(data) {
        tbody.innerHTML = "";
        let dataAr = Object.entries(data);
        dataAr.forEach(book => {
            let bookObj = {
                _id: book[0],
                title: book[1].title,
                author: book[1].author
            }
            createTableRow(bookObj)
        });
        titleInput.value = "";
        authorInput.value = "";
    }

    function createTableRow(book) {
        console.log(book)
        let bookTr = document.createElement("tr");
        bookTr.id = book._id;
        let authorTd = document.createElement("td");
        authorTd.textContent = book.author;

        let titleTd = document.createElement("td");
        titleTd.textContent = book.title;

        let buttonsTd = document.createElement("td");

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", (() => editBook(bookTr)));

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "delete";
        deleteBtn.addEventListener("click", (() => deleteBook(bookTr)));

        buttonsTd.appendChild(editBtn);
        buttonsTd.appendChild(deleteBtn);

        bookTr.appendChild(titleTd);
        bookTr.appendChild(authorTd);
        bookTr.appendChild(buttonsTd);
        tbody.appendChild(bookTr);

    }

    function createNewBook(author, title) {
        authorInput.value = "";
        titleInput.value = "";


        console.log("create a book!")
        console.log(author, title)
        let newBook = {
                "author": author,
                "title": title
            }
            //post book
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(newBook),
            redirect: 'follow'
        };

        fetch("http://localhost:3030/jsonstore/collections/books", requestOptions)
            .then(response => response.json())
            .then(result => createTableRow(result))
            .catch(error => console.log('error', error));
    }

    function deleteBook(bookTr) {
        console.log(bookTr)
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:3030/jsonstore/collections/books/${bookTr.id}`, requestOptions)
            .then(response => response.json())
            .then(result => fetchAllBooks())
            .catch(error => console.log('error', error));
    }

    function editBook(bookTr) {
        console.log(bookTr)
        hForm.textContent = "Edit FORM";
        authorInput.value = bookTr.childNodes[1].textContent;
        title.value = bookTr.childNodes[0].textContent;
        saveButton.style.display = "block";
        createButton.style.display = "none";
        saveButton.addEventListener("click", function(e) {
            e.preventDefault();

            console.log("save pressed")
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                author: authorInput.value,
                title: titleInput.value,
                _id: bookTr.id
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`http://localhost:3030/jsonstore/collections/books/${bookTr.id}`, requestOptions)
                .then(response => response.json())
                .then(result => fetchAllBooks())
                .catch(error => console.log('error', error));

            hForm.textContent = "FORM";
            saveButton.style.display = "none";
            createButton.style.display = "block";

        })

    }

}

attachEvents();