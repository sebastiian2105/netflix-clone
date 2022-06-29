import React, { useEffect, useState } from 'react'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow/MovieRow';
import FeaturedMovie from './components/FeaturedMovie/FeaturedMovie';
import Header from './components/Header/Header';

import './App.css';

export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackHeader, setBlackHeader] = useState(false);

    useEffect(() => {
        const LoadAll = async () => {
            // Total List of content
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            // add Featured
            let originals = list.filter(i=>i.slug === 'originals');
            let randomChose = Math.floor(Math.random() * (originals[0].items.results.length - 1));
            let chosen = originals[0].items.results[randomChose];

            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            
            setFeaturedData(chosenInfo);

        }

        LoadAll();

    }, [])

    useEffect(() => {
        const scrollListener = () => {
            if(window.scrollY > 50){
                setBlackHeader(true);
            } else {
                setBlackHeader(false);
            }
        }

        window.addEventListener('scroll', scrollListener);
        return () => {
            window.removeEventListener('scroll', scrollListener)
        }
    }, [])

    return (
        <div className='page'>

            <Header black={blackHeader} />

            {featuredData &&
                <FeaturedMovie item={featuredData} />
            }

            <section className='lists'>
                {movieList.map((item, key)=>(
                    <MovieRow key={key} title={item.title} items={item.items} />
                ))}
            </section>

            <footer>
                Realizado con <span role="img" aria-label='Corazón' >♥</span> por Sebastian Salcedo <br />
                Derechos de imagenes - Netflix <br />
                Agradecimientos a <a href='https://www.themoviedb.org/'>TMDB</a> por su API
            </footer>
            
            {movieList.length <= 0 &&
            <div className='loading'>
                <img src='https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif' alt='Cargando' />
            </div>
            }

        </div>
    )
}