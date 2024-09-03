import {useQuery} from "@tanstack/react-query";
import api from "../utlis/Api.";



const fetchUpcomingMovies= ()=>{
    return api.get(`/movie/upcoming?language=ko-KR`);
};

export const useUpcomingMoviesQuery=()=>{
    return useQuery({
        queryKey:['movie-upcoming'],
        queryFn:fetchUpcomingMovies,
        select:(result)=>result.data
    });
};
