import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Outlet, useNavigate} from "react-router-dom";
import logo from '../logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebook, faInstagram, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";
import './AppLayout.style.css'
import {Col, Row} from "react-bootstrap";

const AppLayout = () => {

    const [keyword, setKeyword] = useState("");
    const nav = useNavigate()
    const searchByKeyword=(e)=>{
        e.preventDefault();
        nav(`movies?q=${keyword}`);
        setKeyword("");
    }

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary" variant={'dark'} data-bs-theme={'dark'}>
                <Container fluid>
                    <Navbar.Brand href="/">
                        <img src={logo} alt=''/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/movies">Movies</Nav.Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={searchByKeyword}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={keyword}
                                onChange={(event)=>setKeyword(event.target.value)}
                            />
                            <Button type={"submit"} variant="outline-danger">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet/>
            <div className={'footer'}>
                <Row className={'social-link'}>
                    <FontAwesomeIcon icon={faInstagram} size={'3x'}/>
                    <FontAwesomeIcon icon={faFacebook} size={'3x'}/>
                    <FontAwesomeIcon icon={faTwitter} size={'3x'}/>
                    <FontAwesomeIcon icon={faYoutube} size={'3x'}/>
                </Row>
                <Container className={'footer-info'}>
                    <Row>
                        <Col md={6}>
                            <ul>
                                <li>
                                    상호: koonys Netflix
                                </li>
                                <li>
                                    사업자등록번호: 000-000000-000
                                </li>
                                <li>
                                    프로젝트 이름: 넷플릭스 클론 코딩
                                </li>
                                <li>
                                    이메일 주소: reactPractice@ko.com | 연락처: 000-0000-0000
                                </li>
                                <li>
                                    주소: 서울 어딘가
                                </li>
                            </ul>
                        </Col>
                        <Col md={3} className={'d-none d-md-flex flex-column btnGroup'}>
                            <div>
                                <Button variant={"light"} size={'sm'}>Home</Button>
                            </div>
                            <div>
                                <Button variant={"light"} size={'sm'}>About Me</Button>
                            </div>
                        </Col>
                        <Col md={3} className={'d-none d-md-flex  flex-column btnGroup'}>
                            <div>
                                <Button variant={"light"} size={'sm'}>이용약관</Button>
                            </div>
                            <div>
                                <Button variant={"light"} size={'sm'}>개인정보처리</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div
                style={{
                    backgroundColor: "gray",
                    height: '80px',
                    display: "flex",
                    alignItems: "center",
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px'
                }}
            >
                <h2 style={{
                    paddingLeft: '4rem'
                }}>Copy Right @ 2024 HSH</h2>
            </div>
        </div>
    );
};

export default AppLayout;