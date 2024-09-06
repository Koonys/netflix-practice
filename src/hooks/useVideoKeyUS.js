import api from "../utlis/Api.";
import {useQuery} from "@tanstack/react-query";

const fetchVideoKeyUS=(id)=>{
    return api.get(`movie/${id}/videos`)
}

export const useVideoKeyUS=(id)=>{
    return  useQuery({
        queryKey:['movie-video-us',id],
        queryFn:()=>fetchVideoKeyUS(id),
        select:(re)=>re.data.results[0]
    })
}