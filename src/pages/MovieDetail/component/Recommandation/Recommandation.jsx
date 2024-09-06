import React from 'react';
import {Col, Row} from "react-bootstrap";
import {useRecommand} from "../../../../hooks/useRecommand";
import MovieCard from "../../../../common/MovieCard/MovieCard";

const Recommend = (movie) => {

    const {data, isLoading} = useRecommand(movie.id);
    const showMovie =()=>{
        return data?.results.slice(0, 6)
    }
    console.log('data',showMovie())
    return (
        <>
            {!isLoading?showMovie()===0
                ?showMovie()?.map((item, index)=>(
                <Col key={index} xs={4} style={{
                    marginTop: '0.5rem',
                    marginBottom: '1.5rem'
                }}>
                    <MovieCard movie={item} pageType={'detail'}></MovieCard>
                </Col>
            ))
            : <div className={'d-flex justify-content-center'}>
                    <h2 style={{
                        marginTop: '1rem',
                        marginBottom: '1.5rem'
                    }}>관련영화 정보가 없습니다.</h2>
                </div>:""}
        </>

    );
};

export default Recommend;