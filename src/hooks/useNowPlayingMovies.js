import {useQuery} from "@tanstack/react-query";
import api from "../utlis/Api.";

const fetchNowPlayingMovies= ()=>{
    return api.get(`movie/now_playing`,{
        params: {
            language: 'ko-KR',
            region: 'KR'
        }
    })
};
export const useNowPlayingMoviesQuery=()=>{
    return useQuery({
        queryKey:['movie-nowPlaying'],
        queryFn:fetchNowPlayingMovies,
        select:(result)=>result.data
    });
};
