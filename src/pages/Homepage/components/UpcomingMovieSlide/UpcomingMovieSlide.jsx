import React from 'react';
import {Alert} from "react-bootstrap";
import 'react-multi-carousel/lib/styles.css';
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import {useUpcomingMoviesQuery} from "../../../../hooks/useUpcommingMovies";

const UpcomingMovieSlide = () => {



    const {data, isLoading, isError, error} = useUpcomingMoviesQuery();
    if(isLoading){
        return
    }

    if(isError){
        return <Alert variant={'danger'}>{error.message}</Alert>
    }

    return (
        <div>
            <MovieSlider title={'개봉 예정 영화'} movies={data.results}/>
        </div>
    );
};

export default UpcomingMovieSlide;