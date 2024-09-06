import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {useSearchMovieQuery} from "../../hooks/useSearchMovie";
import {Alert, ButtonGroup, Col, Dropdown, DropdownButton, DropdownItem, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import './MoviePage.module.css';
import './MoviePage.style.css';
import LoadSpinner from "../../common/LoadSpinner/LoadSpinner";
import {useMovieGenreQuery} from "../../hooks/useMovieGenre";
import Button from "react-bootstrap/Button";

const MoviePage = () => {


    const [query, setQuery] = useSearchParams();
    const [page, setPage] = useState(1);
    const [title, setTitle] = useState('인기도(내림차순)');
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 991);
    const [genreTitle, setGenreTitle] = useState('전체');
    const [modData, setModData] = useState([]);
    const [selectedID, setSelectedID] = useState(null);

    const keyword = query.get('q')

    const {data, isLoading,isError,error} = useSearchMovieQuery({keyword, page});
    const {data:genreData} = useMovieGenreQuery();

    useEffect(()=>{
        if(data?.results){
            setModData(data.results);
        }
    }, [data])

    const handlePageClick=({selected})=>{
        setPage(selected+1)
    }

    const handleSelect = (e) => {
        switch (e){
            case '1':
                setTitle('인기도(내림차순)');
                setModData([...data?.results].sort((a,b)=>b.popularity - a.popularity));
                break;
            case '2':
                setTitle('인기도(올림차순)');
                setModData([...data?.results].sort((a,b)=>a.popularity - b.popularity));
                break;
            case '3':
                setTitle('평점(내림차순)');
                setModData([...data?.results].sort((a,b)=>b.vote_average - a.vote_average));
                break;
            case '4':
                setTitle('평점(올림차순)');
                setModData([...data?.results].sort((a,b)=>a.vote_average - b.vote_average));
                break;
            default:
                setTitle('정렬')
        }
    }

    const handleGenre = (id, event)=> {
        let selectedGenre = null;
        if(!isSmallScreen){
            console.log('버튼')
            selectedGenre = id.target.value;
            const name = id.target.getAttribute('data-name')
            setGenreTitle(name)
        }else{
            console.log('드롭다운')
            selectedGenre = id;
            const name = event.target.getAttribute('data-name')
            setGenreTitle(name)
        }

        setSelectedID(parseInt(selectedGenre))

        if(selectedGenre === '0'){
            console.log('전체')
            setModData(data?.results)
            return;
        }

        if(!selectedGenre) return;
        const filtered = data?.results.filter(movie=>movie.genre_ids.includes(parseInt(selectedGenre)))
        console.log('filter',filtered)
        setModData(filtered)
    }

    useEffect(() => {

    }, [modData]);

    useEffect(()=>{
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 991);
        };
        window.addEventListener('resize',handleResize);
        return()=>{
            window.removeEventListener('resize', handleResize);
        };
    },[])

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
                <Col lg={7} xs={6}>
                    {isSmallScreen ? (
                        <DropdownButton title={genreTitle} variant={'danger'} onSelect={handleGenre}>
                            <DropdownItem eventKey={0} data-name={'전체'}>전체</DropdownItem>
                            {genreData?.map(({name,id},index)=><Dropdown.Item key={index} eventKey={id} data-name={name} >{name}</Dropdown.Item>)}
                        </DropdownButton>
                    ) : (
                        <>
                        <Button className={'m-1'} variant={selectedID === 0 ? 'light':'danger'} value={0} data-name={'전체'} onClick={handleGenre}>전체</Button>
                        {genreData?.map(({name, id},index)=>
                            <Button
                                className={'m-1'}
                                variant={selectedID === id ? 'light':'danger'}
                                key={index}
                                value={id}
                                data-name={name}
                                onClick={handleGenre}
                            >
                                {name}
                            </Button>)}
                        </>
                    )}
                </Col>
                <Col lg={5} xs={6}>
                    <div className="mb-2 d-flex justify-content-end">
                        <DropdownButton
                            as={ButtonGroup}
                            key={'down-centered'}
                            id={`dropdown-button-drop-down-centered`}
                            drop={'down-centered'}
                            variant='danger'
                            title={`${title}`}
                            onSelect={handleSelect}
                        >
                            <Dropdown.Item eventKey="1">인기도(내림차순)</Dropdown.Item>
                            <Dropdown.Item eventKey="2">인기도(올림차순)</Dropdown.Item>
                            <Dropdown.Item eventKey="3">평점(내림차순)</Dropdown.Item>
                            <Dropdown.Item eventKey="4">평점(올림차순)</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <Row>
                        {modData?.length!==0
                        ? modData?.map((movie, index) =>
                                (<Col key={index} lg={3} xs={4}>
                                    <MovieCard movie={movie}/>
                                </Col>))
                        : <Col className={'d-flex justify-content-center mt-4'}>
                                <div style={{
                                    height: '500px',
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <h1>요청하신 장르에 해당하는 영화가 없습니다.</h1>
                                </div>
                            </Col>
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
                            marginPagesDisplayed={1}
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