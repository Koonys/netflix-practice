import {useQuery} from "@tanstack/react-query";
import api from "../utlis/Api.";

const fetchMovieGenre=()=>{
    return api.get(`/genre/movie/list?language=ko`)
}

export const useMovieGenreQuery=()=>{
    return useQuery({
        queryKey:['movie-genre'],
        queryFn:fetchMovieGenre,
        select:(re)=>re.data.genres,
        staleTime: 300000, //5븐
    })
}