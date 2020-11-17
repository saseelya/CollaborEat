import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import RecipeCards from './components/RecipeCards';
import RecipeCardsByType from './components/RecipeCardsByType';

export default function MainLayout() {
    return (
        <>
            <div>
                <Link to="/recipe/add">Add</Link>
                <h1>CollaborEat</h1>
                <h2>Top Recipes</h2>
                <div>
                    <RecipeCards />
                </div>
            </div>
            <div>
                <h2>Top Breakfast Recipes</h2>
                <div>
                    <RecipeCardsByType id={1}/>
                </div>
            </div>
            <div>
                <h2>Top Entrees</h2>
                <div>
                    <RecipeCardsByType id={5}/>
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