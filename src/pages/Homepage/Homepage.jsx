import React from 'react';
import Banner from "./components/Banner/Banner";
import KoreanMovieSlide from "./components/KoreanMovieSlide/KoreanMovieSlide";
import TopRatedMovieSlide from "./components/TopRatedMovieSlide/TopRatedMovieSlide";
import UpcomingMovieSlide from "./components/UpcomingMovieSlide/UpcomingMovieSlide";
import NowPlayingMovieSlide from "./components/NowPlayingMovieSlide/NowPlayingMovieSlide";

const Homepage = () => {
    return (
        <div>
            <Banner/>
            <KoreanMovieSlide/>
            <NowPlayingMovieSlide/>
            <TopRatedMovieSlide/>
            <UpcomingMovieSlide/>
        </div>
    );
};

export default Homepage;