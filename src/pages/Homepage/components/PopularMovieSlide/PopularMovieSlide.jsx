import React from 'react';
import {usePopularMoviesQuery} from "../../../../hooks/usePopularMovies";
import {Alert} from "react-bootstrap";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from "../MovieCard/MovieCard";
import './PopularMovieSlide.style.css'

const PopularMovieSlide = () => {

    const response = {
        desktop: {
            breakpoint: { max: 3000, min: 901},
            items: 6
        },
        tablet: {
            breakpoint: {max: 900, min: 601},
            items: 4,
        },
        mobile: {
            breakpoint: {max: 700, min: 0},
            items: 2
        }
    }

    const {data, isLoading, isError, error} = usePopularMoviesQuery()
    if(isLoading){
        return <h1>Loading</h1>
    }

    if(isError){
        return <Alert variant={'danger'}>{error.message}</Alert>
    }

    return (
        <div>
            <h3 className={'slide-title'}>Popular Movie</h3>
            <Carousel
                infinite={true}
                centerMode={true}
                itemClass={'movie-slider p-1'}
                containerClass={'carousel-container'}
                responsive={response}
            >
                {data.results.map((movie,index)=><MovieCard movie={movie} key={index}/>)}
            </Carousel>
        </div>
    );
};

export default PopularMovieSlide;