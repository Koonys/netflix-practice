import React, {useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {useSearchMovieQuery} from "../../hooks/useSearchMovie";
import {Alert, Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import './MoviePage.module.css';
import './MoviePage.style.css';
import LoadSpinner from "../../common/LoadSpinner/LoadSpinner";

const MoviePage = () => {

    const [query, setQuery] = useSearchParams();
    const [page, setPage] = useState(1);
    const keyword = query.get('q')

    const {data, isLoading,isError,error} =useSearchMovieQuery({keyword, page});

    console.log('data',data)
    console.log('keyword',keyword)

    const handlePageClick=({selected})=>{
        setPage(selected+1)
    }

    if(isLoading){
        return <LoadSpinner/>
    }
    if(isError){
        return <Alert variant={'danger'}>{error.message}</Alert>
    }

    if(data.results.length===0){
        return (
        <div className={'result-empty'}>
            <p>입력하신 검색어 '{keyword}'와 일치하는 결과가 없습니다.</p>
            <ul>
                <li>다른 키워드를 입력해보세요.</li>
                <li>영화 제목으로 검색해보세요.</li>
                <li>코미디, 로맨스와 같은 장르명으로 검색해보세요.</li>
            </ul>
        </div>
        )
    }

    return (
        <Container className={'mt-5'}>
            <Row>
                <Col lg={4}>
                    filter
                    sort
                </Col>
                <Col lg={8}>
                     <Row>
                    {data?.results.map((movie,index)=>
                        (<Col key={index} lg={3} xs={4}>
                            <MovieCard movie={movie}/>
                        </Col>))
                    }
                     </Row>
                    <div className={'mt-5'} style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                    <ReactPaginate
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={data?.total_pages}
                        previousLabel="<"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                        forcePage={page - 1}
                    />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default MoviePage;