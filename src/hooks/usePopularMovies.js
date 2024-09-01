import {useQuery} from "@tanstack/react-query";
import api from "../utlis/Api.";

const fetchPopularMovies= async ()=>{
    return await api.get(`/discover/movie`,{
        params: {
            language: 'ko-KR',
            sort_by:'popularity.desc',
            region: 'KR',
            with_original_language: 'ko',
            certification_country: 'KR',
            'certification.lte': '15'
        }
    })
};
export const usePopularMoviesQuery=()=>{
    return useQuery({
        queryKey:['movie-popular'],
        queryFn:fetchPopularMovies,
        select:(result)=>result.data
    });
};
