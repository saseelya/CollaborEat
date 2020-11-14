import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeCards from './components/RecipeCards';

export default function MainLayout() {
    return (
        <>
            <div>
                <h1>CollaborEat</h1>
                <h2>Top Recipes</h2>
                <div>
                    <RecipeCards />
                </div>
            </div>
            <div>
                <h2>Top Breakfast Recipes</h2>
                <div>
                    <RecipeCards />
                </div>
            </div>
        </>
    )
};

// TODO: Find All
//       Image cards
//          Rating
//          Name
//          Click to View