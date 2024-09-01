import React from 'react';
import {usePopularMoviesQuery} from "../../../../hooks/usePopularMovies";
import {Alert} from "react-bootstrap";
import "./Banner.style.css";

const Banner = () => {

    const {data,isLoading,isError,error} = usePopularMoviesQuery()
    console.log('ddd',data)
    const randomIndex = ()=> {
        return Math.floor(Math.random() * 20);
    }

    const index = randomIndex();


    if(isLoading){
        <h1>Loading....</h1>
    }
    if(isError){
        <Alert variant={'danger'}>{error.massage}</Alert>
    }

    return (
        <div style={{
            backgroundImage:`url(https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[index].backdrop_path})`
        }}
        className={'banner'}>
            <div className={'text-white banner-text-area'}>
                <h1>{data?.results[index].title}</h1>
                <p>{data?.results[index].overview}</p>
            </div>
        </div>
    );
};

export default Banner;