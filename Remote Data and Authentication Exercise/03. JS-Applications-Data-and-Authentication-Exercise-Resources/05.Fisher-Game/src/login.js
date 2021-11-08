    document.getElementById(`login-form`).addEventListener(`submit`, async(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const email = formData.get(`email`);
        const password = formData.get(`password`);

        const response = await fetch(`http://localhost:3030/users/login`, {
            method: `post`,
            headers: { "Content-Type": `application/json` },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            e.target.reset();
            return alert(error.message);
        }

        const data = await response.json();
        console.log(data);
        sessionStorage.setItem(`userToken`, data.accessToken);
        sessionStorage.setItem(`userId`, data._id);
        sessionStorage.setItem(`email`, data.email); // change here
        e.target.reset();


        window.location.pathname = "/05.Fisher-Game/index.html";


        return alert(`Login successful!`);

    })