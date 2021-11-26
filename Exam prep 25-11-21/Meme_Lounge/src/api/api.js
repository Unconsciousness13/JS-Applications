import { getUserData } from '../util.js';

async function request(url, options) {

    try {
        const response = await (fetch(url, options));

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response == 204) {
            return response;
        } else {
            return response.json();
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {}
    };

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();
    if (userData) {
        options.headers['X-Authorization'] = userData.token;
    }

    return options;
}

export async function get() {
    return request(url, createOptions())
}