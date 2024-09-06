import React, {useState} from 'react';
import Container from "react-bootstrap/Container";
import {Badge, Col, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useMovieDetail} from "../../hooks/useMovieDetail";
import LoadSpinner from "../../common/LoadSpinner/LoadSpinner";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faStar, faStarHalf, faXmark} from "@fortawesome/free-solid-svg-icons";
import './MovieDetailPage.style.css'
import MovieReview from "./component/MovieReview/MovieReview";
import Recommend from "./component/Recommandation/Recommandation";
import ModalYoutube from "./component/ModalYoutube";

const MovieDetailPage = () => {

    const [userSelect, setUserSelect] = useState(true);
    const [modalShow, setModalShow] = useState(false);

    const {id} = useParams();

    const {data, isLoading, isError} = useMovieDetail(id);
    const companyLogo = data?.production_companies.find(company => company.logo_path)

    const convertMoney=(number)=>{
        return parseInt(number).toLocaleString();
    }

    const convertVote=(number)=>{
        number=number/2
        const star = <FontAwesomeIcon icon={faStar}/>;
        const half = <FontAwesomeIcon icon={faStarHalf}/>;
        const starCount = Math.floor(number);
        const halfCount = number%1>=0.5;
        const stars = [];

        for(let i = 0; i < starCount; i++){
            stars.push(star);
        }
        if(halfCount){
            stars.push(half)
        }
        return stars;
    }

    const clickReview=()=>{
        setUserSelect(true)
    }

    const clickRecommend=()=>{
        setUserSelect(false)
    }

    if(isLoading){
        return <LoadSpinner/>
    }
    if(isError){
        return <NotFoundPage/>
    }

    return (
        <div>
            <Container fluid style={{ maxWidth: '1400px', marginTop: '30px', paddingLeft: '5vw', paddingRight: '5vw' }}>
                <Row>
                    <Col md={6} style={{marginBottom: '20px'}}>
                        <div>
                            <img src={`https://image.tmdb.org/t/p/original${data?.poster_path}`} width={'100%'} alt={'movie'}/>
                        </div>
                    </Col>
                    <Col md={6}>
                        <Row className={'mb-3'}>
                            <Col xs={6}>
                                <h1 style={{
                                    fontSize: '2.5rem'
                                }}>{data?.title}</h1>
                            </Col>
                            <Col xs={6} className={'d-flex justify-content-end align-items-center'}>
                                <Button
                                    className={'play-btn'}
                                    variant={'danger'}
                                    onClick={()=>setModalShow(true)}>
                                    {<FontAwesomeIcon icon={faPlay} style={{marginRight: '8px'}}/>}예고편 재생
                                </Button>
                            </Col>
                        </Row>
                        <Row style={{
                            borderBottom: 'solid 1px white',
                            paddingBottom: '1rem'
                        }}>
                            <Col xs={6}>
                                <div className={'d-flex'}>
                                    <span>개봉일: </span><p style={{marginLeft: '10px', marginBottom: '2px'}}>{data?.release_date}</p>
                                </div>
                                <div className={'d-flex'} >
                                    <span>상영시간: </span><p style={{marginLeft: '10px', marginBottom: '0px'}}>{data?.runtime}분</p>
                                </div>
                            </Col>
                            <Col xs={6} className={'d-flex justify-content-end align-items-center'}>
                                <h5 style={{marginBottom: '0'}}>제작사: </h5>
                                {companyLogo ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/original${companyLogo.logo_path}`}
                                        style={{
                                            height: 'auto',
                                            maxHeight: '3rem',
                                            maxWidth: '5rem',
                                            marginLeft: '1vw',
                                            backgroundColor: "white",
                                            borderRadius: '0.5rem'
                                        }}
                                        alt={companyLogo.name}
                                    />
                                 ) : ('')
                                }
                            </Col>
                        </Row>
                        <h5
                            style={{
                                marginTop: '15px',
                                marginBottom: '0px'
                            }}
                        >줄거리</h5>
                        <p className={'over-view'}>{data?.overview === ""?'줄거리 정보 없음':data?.overview}</p>
                        <div style={{
                            borderBottom: 'solid 1px white',
                            paddingBottom: '1rem'
                        }}>
                            {data?.genres.map((genre,index) => <Badge bg={'danger'} key={index} className={'genre-badge'}>{genre.name}</Badge>)}
                        </div>
                        <div className={'movie-info-div'}>
                            <Row style={{
                                marginTop: '2rem'
                            }}>
                                <Col style={{
                                    height: '24px'
                                }}><p className={'movie-info-p'}>제작비: {data?.budget === 0 ? '정보없음' : `$${convertMoney(data?.budget)}`}</p></Col>
                                <Col style={{
                                    height: '24px'
                                }}><p className={'movie-info-p'}>수익: {data?.revenue===0? "정보없음" : `$${convertMoney(data?.revenue)}`}</p></Col>
                            </Row>
                            <Row style={{
                                marginTop: '2rem',
                                borderBottom: 'solid 1px white',
                                paddingBottom: '1rem'
                            }}><Col>
                                    평점: {data?.vote_average!==0?convertVote(data?.vote_average).map((star, index) => (
                                    <span style={{
                                        width: '20px',
                                        padding: '0px'
                                    }} key={index}>{star}</span>
                                )): <span style={{
                                width: '20px',
                                padding: '0px'
                            }}><FontAwesomeIcon icon={faXmark} /></span>}
                            </Col>
                                <Col>평점수: {convertMoney(data?.vote_count)}개</Col>
                            </Row>
                        </div>
                        <Row style={{
                            marginTop: '0.5rem'
                        }}>
                            <Col className={'d-flex justify-content-center'}>
                                <Button style={{
                                    width:'100%'
                                }} variant={`${userSelect?'light':'danger'}`}
                                onClick={clickReview}>리뷰보기</Button>
                            </Col>
                            <Col className={'d-flex justify-content-center'}>
                                <Button style={{
                                    width:'100%'
                                }} variant={`${!userSelect?'light':'danger'}`}
                                onClick={clickRecommend}>관련영화보기</Button>
                            </Col>
                        </Row>
                        <Row style={{
                            marginTop: '0.5rem',
                            borderBottom: 'solid 1px white',
                            paddingBottom: '0.5rem'
                        }}>{
                           userSelect?<MovieReview id={id}/>:<Recommend id={id}/>
                        }
                        </Row>
                    </Col>
                </Row>
            </Container>
            <ModalYoutube show={modalShow} onHide={()=>setModalShow(false)} movieId={id} />
        </div>
    );
};

export default MovieDetailPage;