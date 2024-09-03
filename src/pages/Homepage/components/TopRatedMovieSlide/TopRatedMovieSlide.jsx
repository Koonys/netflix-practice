import React from 'react';
import {Alert} from "react-bootstrap";
import 'react-multi-carousel/lib/styles.css';
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import {useTopRatedMoviesQuery} from "../../../../hooks/useTopRatedMovies";

const TopRatedMovieSlide = () => {



    const {data, isLoading, isError, error} = useTopRatedMoviesQuery();
    console.log('dddd',data)
    if(isLoading){
        return <h1>Loading</h1>
    }

    if(isError){
        return <Alert variant={'danger'}>{error.message}</Alert>
    }

    return (
        <div>
            <MovieSlider title={'평단의 찬사를 받은 영화'} movies={data.results}/>
        </div>
    );
};

export default TopRatedMovieSlide;