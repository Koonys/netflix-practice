import React from 'react';
import {Col, Row} from "react-bootstrap";
import {useRecommand} from "../../../../hooks/useRecommand";

const Recommend = (movie) => {

    const {data, isLoading} = useRecommand(movie.id);
    const showMovie =()=>{
        return data?.results.slice(0, 6)
    }
    return (
        <>
            {!isLoading?data?.results.length>=0
                ?showMovie()?.map((item, index)=>(
                <Col key={index} xs={6} style={{
                    marginTop: '0.5rem'
                }}>
                    <div className={'d-flex justify-content-end align-items-end'}
                    style={{
                        backgroundImage:`url(https://image.tmdb.org/t/p/w500${item.poster_path})`,
                        backgroundSize:'cover',
                        borderRadius: '10px',
                        aspectRatio: '2/3',
                        marginBottom: '1rem',
                    }}>
                    </div>
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