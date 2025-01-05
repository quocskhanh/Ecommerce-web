export const fetcher = (...args) => fetch(...args).then((res) => res.json())
export const apiKey  = "efa2f01249c334e3330593fa6eb2b13b"
const tmdbEndpoint   = "https://api.themoviedb.org/3/movie"
const tmdbEndpointSearch   = "https://api.themoviedb.org/3/search/movie"
export const  tmdbAPI ={
//https://api.themoviedb.org/3/movie/now_playing?api_key=efa2f01249c334e3330593fa6eb2b13b
    getMovieList: (type,page = 1) =>
        `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
    getMovieDetail: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
    getMovieMeta: (movieId,type) => `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`,
    imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
    image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
    getMovieSearch:(query,page) => `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`
}