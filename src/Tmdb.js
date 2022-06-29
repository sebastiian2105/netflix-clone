const API_KEY = 'fc5495d185a263da54750c0c95f9edaa';
const API_BASE = 'https://api.themoviedb.org/3';

/*
Netflix

Originals
Trending
Top rated

Action
Comedy
Horror
Romance
Drama
*/

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originales de Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=es&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para ti',
                items: await basicFetch(`/trending/all/week?language=es&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Mejor Calificados',
                items: await basicFetch(`/movie/top_rated?language=es&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Acción',
                items: await basicFetch(`/discover/movie?with_genres=28&language=es&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comedia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=es&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=es&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=es&api_key=${API_KEY}`)
            },
            {
                slug: 'drama',
                title: 'Drama',
                items: await basicFetch(`/discover/movie?with_genres=18&language=es&api_key=${API_KEY}`)
            },
        ];
    },

    getMovieInfo: async (movieId, type) => {
        let info = {};

        if(movieId){
            switch(type){
                case 'movie':
                    info = basicFetch(`/movie/${movieId}?language=es&api_key=${API_KEY}`);
                break;
                case 'tv':
                    info = basicFetch(`/tv/${movieId}?language=es&api_key=${API_KEY}`);
                break;
                default :
                    info = null;
                break;
            }
        }

        return info;
    }

}