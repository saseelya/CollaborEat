import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import RecipeCards from './components/RecipeCards';
import RecipeCardsByType from './components/RecipeCardsByType';
import RecipeCardsByDate from './components/RecipeCardsByDate';

import Carousel from 'react-bootstrap/Carousel';


export default function MainLayout() {
    return (
        <>
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="cutting-tomatoes.png?text=First slide&bg=373940"
                    alt="First slide"
                    />
                    <Carousel.Caption className="text-light bg-dark">
                        <h3>Welcome to CollaborEat!</h3>
                        <p>On November 9th, 2020, three friends came together to create CollaborEat, a place for recipes of all kinds.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="Huaraches.png?text=Second slide&bg=282c34"
                    alt="Second slide"
                    />

                    <Carousel.Caption className="text-light bg-dark">
                        <h3>Our Mission</h3>
                        <p>Here at CollaborEat, we believe that food has the unqiue power to change hearts and minds. Cooking is much more than combining ingredients.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="Lusumpuko.png?text=Third slide&bg=20232a"
                    alt="Third slide"
                    />

                    <Carousel.Caption className="text-light bg-dark">
                        <h3>Interested in CollaborEat?</h3>
                        <p>Register today and start making memories, for free!</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <div>
                <Link to="/recipe/add">Add</Link>
                <h1 className="text-center">Newest Submissions</h1>
                <RecipeCardsByDate />
            </div>
            <div>
            <h1 className="text-center">Top Breakfast Recipes</h1>
                <div>
                    <RecipeCardsByType id={1}/>
                </div>
            </div>
            <div>
            <h1 className="text-center">Top Brunch Recipes</h1>
                <div>
                    <RecipeCardsByType id={2}/>
                </div>
            </div>
            <div>
            <h1 className="text-center">Top Dessert Recipes</h1>
                <div>
                    <RecipeCardsByType id={3}/>
                </div>
            </div>
            <div>
            <h1 className="text-center">Top Dinner Recipes</h1>
                <div>
                    <RecipeCardsByType id={4}/>
                </div>
            </div>
            <div>
            <h1 className="text-center">Top Entree Recipes</h1>
                <div>
                    <RecipeCardsByType id={5}/>
                </div>
            </div>
            <div>
            <h1 className="text-center">Top Lunche Recipes</h1>
                <div>
                    <RecipeCardsByType id={6}/>
                </div>
            </div>
            <div>
            <h1 className="text-center">Top Side Recipes</h1>
                <div>
                    <RecipeCardsByType id={7}/>
                </div>
            </div>
            <div>
            <h1 className="text-center">Top Snack Recipes</h1>
                <div>
                    <RecipeCardsByType id={8}/>
                </div>
            </div>
        </>
    )
};
