import React from 'react';
import {Badge} from "react-bootstrap";
import HomepageStyle from './MovieCard.module.css';
import MoviePageStyle from './MoviePage.module.css';
import DetailStyle from './DetailPage.module.css';
import {useMovieGenreQuery} from "../../hooks/useMovieGenre";
import {useNavigate} from "react-router-dom";

const MovieCard = ({movie, pageType}) => {

    const setUpStyle=(type)=>{
        if(type === 'homePage'){return HomepageStyle}else if(type === 'detail'){return DetailStyle}else{return MoviePageStyle}
    }
    const styles = setUpStyle(pageType);

    const nav = useNavigate();
    const movieDetail = (id)=> {
        nav(`/movies/${id}`)
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    }

    const {data:genreData} = useMovieGenreQuery();

    const transGenre = (genreIds)=> {
        if(!genreData){return []}

        return genreIds.map((id) => {
            const genreObj = genreData.find((genre) => genre.id === id)
            return genreObj.name;
        });
    }

    return (
        <div
            style={{
                backgroundImage:`url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
            }}
            className={styles.movieCard}
            onClick={()=>movieDetail(movie.id)}
        >
            <div className={styles.overlay}>
                <h1>{movie.title}</h1>
                <div>
                    {transGenre(movie.genre_ids).map((id,index) => <Badge bg={'danger'} key={index} className={'me-1'}>{id}</Badge>)}
                    <div>평점: {movie.vote_average}점</div>
                    <div>인기점수: {movie.popularity}점</div>
                    <div>{movie.adult ? "선정적 장면 주의" : "선정적 장면 없음"}</div>
                </div>
            </div>

        </div>
    );
};

export default MovieCard;
