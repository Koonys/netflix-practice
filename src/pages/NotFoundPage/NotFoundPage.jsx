import React from 'react';
import AppLayout from "../../layouts/AppLayout";
import './NotFouondPage.style.css'
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {useNowPlayingMoviesQuery} from "../../hooks/useNowPlayingMovies";

const NotFoundPage = () => {

    const nav = useNavigate();

    const home = () =>{
        nav('/')
    }

    const {data} = useNowPlayingMoviesQuery()
    const randomIndex = ()=> {
        return Math.floor(Math.random() * 20);
    }

    const index = randomIndex();

    return (
        <div>
            <div className={'main-div'}>
                <h1>Page Not Found: 404 ERROR</h1>
                <p>길을 잃으셨군요 홈화면으로 보내드릴까요?</p>
                <Button className={'backBtn'} variant={"light"} onClick={home}>
                    Home 화면으로 돌아가기
                </Button>
            </div>
            <div className={'d-flex justify-content-center'}>
                <div style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w1280${data?.results[index].poster_path})`
                }} className={'img-filed'}>
                </div>
            </div>

        </div>
    );
};

export default NotFoundPage;