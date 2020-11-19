import React, { useState, useEffect } from 'react';

export default function GetRating({ recipe }) {
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const getRating = () => {
            fetch(`${process.env.REACT_APP_API_URL}/feedback/rating/${recipe.recipeId}`)
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
    if (!isNaN(rating)) {
        return (<>{(rating).toFixed(3)} / 5</>);
    }
    else {
        return (<>No Ratings Yet</>);
    }

}
