import React from 'react';
import Carousel from "react-multi-carousel";
import MovieCard from "../MovieCard/MovieCard";
import 'react-multi-carousel/lib/styles.css';
import './MovieSlider.sytle.css';

const MovieSlider = ({title,movies}) => {

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

    return (
        <div className={'mb-4'}>
            <h3 className={'slide-title'}>{title}</h3>
            <Carousel
                infinite={true}
                centerMode={true}
                itemClass={'movie-slider p-1'}
                containerClass={'carousel-container'}
                responsive={response}
            >
                {movies.map((movie, index) => <MovieCard movie={movie} key={index}/>)}
            </Carousel>
        </div>
    );
};

export default MovieSlider;