import React from 'react';
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import YouTube from "react-youtube";
import {useVideoKey} from "../../../hooks/useVideoKey";
import {useVideoKeyUS} from "../../../hooks/useVideoKeyUS";

const ModalYoutube = (props) => {

    const {data} = useVideoKey(props.movieId);
    const {data:usData } = useVideoKeyUS(props.movieId)

    return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton/>
                <Modal.Body className={'d-flex justify-content-center'}>
                    {data?.key?<YouTube
                        videoId={data?.key}
                    />:<YouTube videoId={usData?.key}/>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'danger'} onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
};

export default ModalYoutube;