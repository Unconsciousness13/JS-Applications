import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllAlbums() {
    return api.get(`/data/albums?sortBy=_createdOn%20desc&distinct=name`);
}

// export async function getLastThreeGames() {
//     return api.get('/data/games?sortBy=_createdOn%20desc&distinct=category');
// }
export async function createAlbum(album) {
    return api.post('/data/albums', album);
}

export async function getAlbumById(id) {
    return api.get('/data/albums/' + id);
}

export async function editAlbum(id, album) {
    return api.put('/data/albums/' + id, album);
}

export async function deleteAlbum(id) {
    return api.del('/data/albums/' + id);
}

// export async function getAllCommentsForASpecificGame(gameId) {
//     return api.get(`/data/comments?where=gameId%3D%22${gameId}%22`)
// }

// export async function createComment(body) {
//     return api.post('/data/comments', body);
// }