import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import './Review.style.css'

const Review = ({item}) => {

    console.log('reiview Item',item)

    const [isExpanded, setIsExpanded] = useState(false);
    const limit = 680;
    const toggleExpand = ()=> {
        setIsExpanded(!isExpanded)
    }

    const removeTags = (string)=> {
        return string.replace(/<\/?[^>]+(>|$)/g, " ");
    }

    return (
        <div style={{
            border: 'solid 3px darkred',
            borderRadius: '0.5rem',
            padding: '0.7rem',
            marginBottom: '0.5rem'
        }}>
            <h6>{item.author}</h6>
            <div style={{fontSize: '0.9rem'}}>
                <span>{isExpanded ? removeTags(item.content) : removeTags(item.content).slice(0, limit) + '....'}</span>
            </div>
            {item.content.length > limit && (
                <Button size={"sm"} variant={'danger'} style={{
                    marginTop: '0.5rem',
                    backgroundColor: 'black',
                    border: '0'
                }} onClick={toggleExpand}>{isExpanded ? '접기' : '더보기'}</Button>
            )}
        </div>
    )
};

export default Review;