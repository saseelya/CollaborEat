import React, { } from 'react';
import { Link } from 'react-router-dom';
import MainRecipeCardsByDate from './components/RecipeCardsByDate';
import MainLayoutRecipeCardsByType from './components/MainLayoutRecipeCardsByType';

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
                    <Carousel.Caption className="text-dark silver-black-gradient">
                        <h3>Welcome to <img src="collaborEatLogoSmall.png?text=First slide&bg=373940" />!</h3>
                        <p>On November 9th, 2020, three friends came together to create CollaborEat, a place for recipes of all kinds.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="Huaraches.png?text=Second slide&bg=282c34"
                    alt="Second slide"
                    />

                    <Carousel.Caption className="text-dark silver-black-gradient">
                        <h3>Our Mission</h3>
                        <p>Here at <img src="collaborEatLogoSmall.png?text=First slide&bg=373940" />, we believe that food has the unqiue power to change hearts and minds. Cooking is much more than combining ingredients.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="Lusumpuko.png?text=Third slide&bg=20232a"
                    alt="Third slide"
                    />

                    <Carousel.Caption className="text-dark silver-black-gradient">
                        <h3>Interested in <img src="collaborEatLogoSmall.png?text=First slide&bg=373940" />?</h3>
                        <p>Register today and start making memories, for free!</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <div>
                <h1 className="text-center text-dark silver-black-gradient">Newest Submissions</h1>
                <MainRecipeCardsByDate />
            </div>
            <div>
            <h1 className="text-center  text-dark silver-black-gradient">Top Breakfast Recipes</h1>
                <div>
                    <MainLayoutRecipeCardsByType mealTypeId={1}/>
                </div>
            </div>
            <div>
            <h1 className="text-center text-dark silver-black-gradient">Top Brunch Recipes</h1>
                <div>
                    <MainLayoutRecipeCardsByType mealTypeId={2}/>
                </div>
            </div>
            <div>
            <h1 className="text-center text-dark silver-black-gradient">Top Dessert Recipes</h1>
                <div>
                    <MainLayoutRecipeCardsByType mealTypeId={3}/>
                </div>
            </div>
            <div>
            <h1 className="text-center text-dark silver-black-gradient">Top Dinner Recipes</h1>
                <div>
                    <MainLayoutRecipeCardsByType mealTypeId={4}/>
                </div>
            </div>
            <div>
            <h1 className="text-center text-dark silver-black-gradient">Top Entree Recipes</h1>
                <div>
                    <MainLayoutRecipeCardsByType mealTypeId={5}/>
                </div>
            </div>
            <div>
            <h1 className="text-center text-dark silver-black-gradient">Top Lunch Recipes</h1>
                <div>
                    <MainLayoutRecipeCardsByType mealTypeId={6}/>
                </div>
            </div>
            <div>
            <h1 className="text-center text-dark silver-black-gradient">Top Side Recipes</h1>
                <div>
                    <MainLayoutRecipeCardsByType mealTypeId={7}/>
                </div>
            </div>
            <div>
            <h1 className="text-center text-dark silver-black-gradient">Top Snack Recipes</h1>
                <div>
                    <MainLayoutRecipeCardsByType mealTypeId={8}/>
                </div>
            </div>
        </>
    )
};
