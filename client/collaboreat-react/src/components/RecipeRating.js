import React, { useState, useEffect } from 'react';

export default function GetRating({ id }) {
    const [rating, setRating] = useState('');

    // useEffect(() => {
    //     const getRating = () => {
    //         fetch(`http://localhost:8080/feedback/rating/${id}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             setRating(data);
    //         })
    //     };
    //     getRating();
    // }, [id]);

    return (
        <td>{rating}</td>
    );
}


