import React, { useState, useEffect } from 'react';

export default function GetRating({ id }) {
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const getRating = () => {
            fetch(`http://localhost:8080/feedback/rating/${id}`)
            .then(response => response.json())
            .then(data => {
                setRating(data);
            })
        };
        if (id) {
            getRating();
        }
    }, [id]);

    if (rating === 0) {
        return (<td></td>);
    };
    return (
        <>{rating}</>
    );
}


