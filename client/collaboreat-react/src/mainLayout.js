import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import RecipeCards from './components/RecipeCards';
import RecipeCardsByType from './components/RecipeCardsByType';
import RecipeCardsByDate from './components/RecipeCardsByDate';

export default function MainLayout() {
    return (
        <>
            <div>
                <Link to="/recipe/add">Add</Link>
                <h1>CollaborEat</h1>
                <h2>Newest Submissions</h2>
                <div>
                    <RecipeCardsByDate />
                </div>
            </div>
            <div>
                <h2>Top Breakfast Recipes</h2>
                <div>
                    <RecipeCardsByType id={1}/>
                </div>
            </div>
            <div>
                <h2>Top Snacks</h2>
                <div>
                    <RecipeCardsByType id={8}/>
                </div>
            </div>
        </>
    )
};
