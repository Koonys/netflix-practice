import React from 'react';
import {Badge} from "react-bootstrap";
import './MovieCard.style.css'

const MovieCard = ({movie}) => {

    return (
        <div
            style={{
                backgroundImage:`url(https://image.tmdb.org/t/p/w1066_and_h600_bestv2${movie.poster_path})`
            }}
            className={'movie-card'}
        >
            <div className={'overlay'}>
                <h1>{movie.title}</h1>
                <div>
                    {movie.genre_ids.map((id,index) => <Badge bg={'danger'} key={index} className={'me-1'}>{id}</Badge>)}
                    <div>평점: {movie.vote_average}점</div>
                    <div>인기점수: {movie.popularity}점</div>
                    <div>{movie.adult ? "청소년관람불가" : "15세이용가"}</div>
                </div>
            </div>

        </div>
    );
};

export default MovieCard;
