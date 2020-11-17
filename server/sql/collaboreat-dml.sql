USE `collaboreat-schema` ;

insert into `collaboreat-schema`.`recipe`(`recipeName`, `recipeStory`, `recipeDescription`,`recipeIngredients`,
		`recipeCookTime`, `recipeSteps`, `recipeDate`, `recipeRating`, `userId`, `mealTypeId`, `imageUrl`)
        values
			('The Sauce','The Story', 'The Description', 'Milk, Butter, Flour', 15, 'mix the stuff, heat it up', 
				'2020-10-20', 0, 1, 1, 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/12/20/0/FNK_The-Best-Tomato-Sauce_H_s4x3.jpg.rend.hgtvcom.826.620.suffix/1576855451811.jpeg'),
			('The Not Sauce', 'Another Story', 'Another Description', 'Not Milk, Not Butter', 10, 'do nothing, drink alc',
				'2020-10-15', 0, 2, 2, 'https://www.recipetineats.com/wp-content/uploads/2020/02/Gravy_4-SQ.jpg'),
			('Yummy Cookies', 'Yet another Story', 'Delicious', 'Milk, Eggs, Flour, Butter', 30, 'mix the stuff, heat it up, enjoy',
			'2020-11-13', 0, 2, 8, 'https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg'),
			('Korean Beef and Broccoli', 'I was searching for new recipes and wandered upon this, it is now a regular on the menu.',
            'Beef, Rice, and Broccolli in brown sugar soy sauce. I usually just use microwave broccolli.', '1/2 lb Ground Beef\n3 Garlic Cloves minced\n1/4 Cup Brown Sugar\n
            1/4 Soy Sauce\n1/4 tsp Pepper\n1/4 tsp Red Paper Flakes\n1/4 tsp Ginger\n2 tsp sesame oil\n 2 or 3 cups of rice', '20',
            'Cook Rice\nCook ground beef and garlic until no longer pink\nWhisk brown sugar, soy sauce, sesame oil, ginger, red pepper flakes, and pepper.
				Pour into ground beef and let simmer for a minute or two.\nServe over hot rice with broccoli.', '2020-11-17', 0, 3, 
                4, 'https://therecipecritic.com/wp-content/uploads/2017/04/0C4A8325.jpg'),
			('Creamy Tomato Tortellini Soup',"When I was a wee lad, my mother would make this. Now it's my turn",);