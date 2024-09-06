import React from 'react';
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import YouTube from "react-youtube";
import {useVideoKey} from "../../../hooks/useVideoKey";
import {useVideoKeyUS} from "../../../hooks/useVideoKeyUS";
import './ModalYoutube.style.css'

const ModalYoutube = ({movieId,...props}) => {

    const {data} = useVideoKey(movieId);
    const {data:usData } = useVideoKeyUS(movieId)


    return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton/>
                <Modal.Body className={'d-flex justify-content-center'}>
                    <div className={'youtube-video-container'}>
                        {data?.key ?
                            <YouTube videoId={data?.key}/> :
                            <YouTube videoId={usData?.key}/>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'danger'} onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
};

export default ModalYoutube;