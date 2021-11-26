async function request(url, options) {

    try {
        const response = await (fetch(url, options));

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }
    } catch (err) {
        alert(err.message);
    }

}