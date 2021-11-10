export async function getServerRequest(url) {

    const response = await fetch(url);
    const result = await response.json();

    if (!response.ok) {
        const error = await response.json();
        throw Error(error.message);
    }

    return result;
}

export async function getAuthServerRequest(url, userToken) {

    const response = await fetch(url, {
        method: "get",
        headers: {
            "Content-Type": `application/json`,
            "X-Authorization": userToken
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw Error(error.message);
    }

    const result = await response.json();

    return result;
}

export async function postServerRequest(url, userToken, postObject) {

    const response = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": `application/json`,
            "X-Authorization": userToken
        },
        body: JSON.stringify(postObject)
    });

    if (!response.ok) {
        const error = await response.json();
        throw Error(error.message);
    }

    const result = await response.json();

    return result;
}

export async function postServerLoginRequest(url, postObject) {

    const response = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": `application/json`,
        },
        body: JSON.stringify(postObject)
    });

    if (!response.ok) {
        const error = await response.json();
        throw Error(error.message);
    }

    const result = await response.json();

    return result;
}

export async function putServerRequest(url, userToken, postObject) {

    const response = await fetch(url, {
        method: "put",
        headers: {
            "Content-Type": `application/json`,
            "X-Authorization": userToken
        },
        body: JSON.stringify(postObject)
    });

    if (!response.ok) {
        const error = await response.json();
        throw Error(error.message);
    }

    const result = await response.json();

    return result;
}

export async function deleteServerRequest(url, userToken) {

    const response = await fetch(url, {
        method: "delete",
        headers: {
            "X-Authorization": userToken
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw Error(error.message);
    }
}