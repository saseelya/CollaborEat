import React, { useState, useEffect } from 'react';

export default function GetRating({ recipe }) {
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const getRating = () => {
            fetch(`http://localhost:8080/feedback/rating/${recipe.recipeId}`)
            .then(response => response.json())
            .then(data => {
                setRating(data);
            })
        };
        if (recipe && recipe.recipeId) {
            getRating();
        }
    }, [recipe]);

    if (rating === 0) {
        return (<></>);
    };
    return (
        <>{rating}</>
    );
}


