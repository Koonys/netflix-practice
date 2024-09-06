import api from "../utlis/Api.";
import {useQuery} from "@tanstack/react-query";

const fetchRecommend=(id)=>{
    return api.get(`movie/${id}/recommendations?language=ko-KR`);
}

export const useRecommand=(id)=>{
    return useQuery({
        queryKey:['movie-recommend',id],
        queryFn:()=>fetchRecommend(id),
        select:(re)=>re.data
    })
}