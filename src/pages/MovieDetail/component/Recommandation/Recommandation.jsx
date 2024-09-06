import React from 'react';
import {Col, Row} from "react-bootstrap";
import {useRecommand} from "../../../../hooks/useRecommand";

const Recommend = (movie) => {

    const {data,isError} = useRecommand(movie.id);
    console.log('recom',data)
    const showMovie =()=>{
        return data?.results.slice(0, 6)
    }
    return (
        <>
            {showMovie()?.map((item, index)=>(
                <Col key={index} xs={6} style={{
                    marginTop: '0.5rem'
                }}>
                    <div className={'d-flex justify-content-end align-items-end'}
                    style={{
                        backgroundImage:`url(https://image.tmdb.org/t/p/w500${item.backdrop_path})`,
                        backgroundSize:'cover',
                        borderRadius: '10px',
                        aspectRatio: '16/9',
                        marginBottom: '1rem',
                    }}>
                        <h3 style={{
                            marginRight: '1rem',
                            textShadow: '1px 1px 1px black'
                        }}>{item.title}</h3>
                    </div>
                </Col>
            ))}
        </>

    );
};

export default Recommend;