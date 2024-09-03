import React from 'react';
import {useKoreanMoviesQuery} from "../../../../hooks/useKoreanMovies";
import {Alert} from "react-bootstrap";
import 'react-multi-carousel/lib/styles.css';
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";

const KoreanMovieSlide = () => {



    const {data, isLoading, isError, error} = useKoreanMoviesQuery()
    if(isLoading){
        return <h1>Loading</h1>
    }

    if(isError){
        return <Alert variant={'danger'}>{error.message}</Alert>
    }

    return (
        <div>
            <MovieSlider title={'한국영화'} movies={data.results}/>
        </div>
    );
};

export default KoreanMovieSlide;