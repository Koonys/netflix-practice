import React from 'react';
import {Alert} from "react-bootstrap";
import 'react-multi-carousel/lib/styles.css';
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import {useNowPlayingMoviesQuery} from "../../../../hooks/useNowPlayingMovies";

const NowPlayingMovieSlide = () => {



    const {data, isLoading, isError, error} = useNowPlayingMoviesQuery();
    console.log('now',data)
    if(isLoading){
        return
    }

    if(isError){
        return <Alert variant={'danger'}>{error.message}</Alert>
    }

    return (
        <div>
            <MovieSlider title={'현재 상영중인 영화'} movies={data.results}/>
        </div>
    );
};

export default NowPlayingMovieSlide;