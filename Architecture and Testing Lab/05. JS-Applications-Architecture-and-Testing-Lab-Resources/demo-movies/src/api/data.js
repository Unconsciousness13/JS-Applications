import * as api from './api.js';

const endPoints = {
    movies: '/data/movies'
};

export async function getAllMovies() {
    return api.get(endPoints.movies);
}