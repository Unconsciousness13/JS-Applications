import { jsonRequest } from '../helpers/jsonRequests.js';


let baseUrl = 'http://localhost:3030/users';

function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function getUser() {
    let user = localStorage.getItem('user') === null ?
        undefined :
        JSON.parse(localStorage.getItem('user'));

    return user;
}

async function login(user) {
    let result = await jsonRequest(`${baseUrl}/login`, 'Post', user);
    setUser(result);
}

async function register(user) {
    let result = await jsonRequest(`${baseUrl}/register`, 'Post', user);
    setUser(result);
}

async function logout(user) {
    await jsonRequest(`${baseUrl}/logout`, 'Get', undefined, true, true);
    localStorage.clear();
}

export default {
    setUser,
    getUser,
    login,
    register,
    logout
}