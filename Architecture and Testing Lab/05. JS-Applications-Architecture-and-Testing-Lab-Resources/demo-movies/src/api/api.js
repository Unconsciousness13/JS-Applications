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

async function get(url) {
    return request(url);
}

async function post(url, data) {
    return request(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': JSON.parse(sessionStorage.getItem('userData')).token
        },
        body: JSON.stringify(data)
    });
}

async function put(url, data) {
    return request(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': JSON.parse(sessionStorage.getItem('userData')).token
        },
        body: JSON.stringify(data)
    });
}

async function del(url) {

}