async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (response.ok != true) {
            if (response.status == 403) {
                sessionStorage.removeItem('userData');
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status === 204) {
            return response;
        } else { // same like data = await response.json()
            return response.json();
        }

    } catch (err) {
        alert(err.message);
        throw err;
    }
}