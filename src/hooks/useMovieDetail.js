import {useQuery} from "@tanstack/react-query";
import api from "../utlis/Api.";


const fetchMovieDetail=(id)=>{
    return api.get(`/movie/${id}`)
}

export const useMovieDetail=(id)=>{
    return useQuery({
        queryKey:['movie-detail',id],
        queryFn:()=>fetchMovieDetail(id),
        select:(re)=>re.data
    })
}