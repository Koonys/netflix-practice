import api from "../utlis/Api.";
import {useQuery} from "@tanstack/react-query";


const fetchMovieReview =(id)=>{
    return api.get(`movie/${id}/reviews`)
}

export const useMovieReview=(id)=>{
    return useQuery({
        queryKey:['movie-review',id],
        queryFn:()=>fetchMovieReview(id),
        select:(re)=>re.data
    })
}