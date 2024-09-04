import React from 'react';
import {useKoreanMoviesQuery} from "../../../../hooks/useKoreanMovies";
import {Alert} from "react-bootstrap";
import "./Banner.style.css";
import LoadSpinner from "../../../../common/LoadSpinner/LoadSpinner";

const Banner = () => {

    const {data,isLoading,isError,error} = useKoreanMoviesQuery()
    const randomIndex = ()=> {
        return Math.floor(Math.random() * 20);
    }

    const index = randomIndex();


    if(isLoading){
        return <LoadSpinner/>
    }
    if(isError){
        return <Alert variant={'danger'}>{error.message}</Alert>
    }

    return (
        <div
            style={{
                backgroundImage:`url(https://image.tmdb.org/t/p/w1066_and_h600_bestv2${data?.results[index].backdrop_path})`
            }}
            className={'banner'}
        >
            <div className={'text-white banner-text-area'}>
                <h1>{data?.results[index].title}</h1>
                <p>{data?.results[index].overview}</p>
            </div>
        </div>
    );
};

export default Banner;