import React from 'react';
import Container from "react-bootstrap/Container";
import {Alert, Col, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useMovieDetail} from "../../hooks/useMovieDetail";
import LoadSpinner from "../../common/LoadSpinner/LoadSpinner";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const MovieDetailPage = () => {

    const {id} = useParams();

    const {data, isLoading, isError, error} = useMovieDetail(id);


    if(isLoading){
        return <LoadSpinner/>
    }
    if(isError){
        return <NotFoundPage></NotFoundPage>
    }

    return (
        <div>
            <Container fluid style={{ maxWidth: '1920px', marginTop: '30px', paddingLeft: '5vw', paddingRight: '5vw' }}>
                <Row>
                    <Col md={4} lg={4}>
                        <div>
                            <img src={`https://image.tmdb.org/t/p/original${data?.poster_path}`} width={'100%'} alt={'movie'}/>
                        </div>
                    </Col>
                    <Col md={8}>

                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MovieDetailPage;