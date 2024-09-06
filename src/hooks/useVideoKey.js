import api from "../utlis/Api.";
import {useQuery} from "@tanstack/react-query";

const fetchVideoKey=(id)=>{
    return api.get(`movie/${id}/videos?language=ko-KR`)
}

export const useVideoKey=(id)=>{
    return  useQuery({
        queryKey:['movie-video',id],
        queryFn:()=>fetchVideoKey(id),
        select:(re)=>re.data.results[0]
    })
}