const firstNameInput = document.querySelector("#form > div.inputs > input[type=text]:nth-child(1)");
const lastNameInput = document.querySelector("#form > div.inputs > input[type=text]:nth-child(2)");
const facultyNumberInput = document.querySelector("#form > div.inputs > input[type=text]:nth-child(3)");
const gradeInput = document.querySelector("#form > div.inputs > input[type=text]:nth-child(4)");
const tableBody = document.querySelector("#results > tbody");
// button
const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", addStudent);

const url = 'http://localhost:3030/jsonstore/collections/students/';


getStudents();

async function getStudents() {
    const res = await fetch(url);
    const data = await res.json();

    for (const key in data) {
        const fn = data[key].firstName;
        const ln = data[key].lastName;
        const faNu = data[key].facultyNumber;
        const gr = data[key].grade;

        addStudentToDom(fn, ln, faNu, gr);

    }

}

async function addStudent(e) {
    e.preventDefault();
    if (firstNameInput.value == "" || lastNameInput.value == "" || facultyNumberInput == "" || gradeInput.value == "") {
        return;
    }

    let firstName = firstNameInput.value;
    let lastName = lastNameInput.value;
    let facultyNumber = facultyNumberInput.value;
    let grade = Number(gradeInput.value).toFixed(2);
    const res = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, facultyNumber, grade })

    });
    const result = await res.json();

    firstNameInput.value = "";
    lastNameInput.value = "";
    facultyNumberInput.value = "";
    gradeInput.value = "";

    return result;

}


function addStudentToDom(fn, ln, faNu, gr) {
    let tr = document.createElement('tr');

    let thFirstName = document.createElement('th');
    thFirstName.textContent = fn;

    let thLastName = document.createElement('th');
    thLastName.textContent = ln;

    let thFacNumb = document.createElement('th');
    thFacNumb.textContent = faNu;

    let thGrad = document.createElement('th');
    thGrad.textContent = gr;

    tr.appendChild(thFirstName);
    tr.appendChild(thLastName);
    tr.appendChild(thFacNumb);
    tr.appendChild(thGrad);

    tableBody.appendChild(tr);

}