import React, { useEffect, useState } from 'react'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';

import './App.css'

export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);

    useEffect(() => {
        const LoadAll = async () => {
            // Total List of content
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            // add Featured
            let originals = list.filter(i=>i.slug === 'originals');
            let randomChose = Math.floor(Math.random() * (originals[0].items.results.length - 1));
            let chosen = originals[0].items.results[randomChose];

            console.log(chosen)
        }

        LoadAll();

    }, [])

    return (
        <div className='page'>

            {featuredData &&
                <FeaturedMovie item={featuredData} />
            }

            <section className='lists'>
                {movieList.map((item, key)=>(
                    <MovieRow key={key} title={item.title} items={item.items} />
                ))}
            </section>
        </div>
    )
}