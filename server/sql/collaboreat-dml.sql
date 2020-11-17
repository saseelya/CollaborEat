USE `collaboreat-schema` ;

insert into `collaboreat-schema`.`recipe`(`recipeName`, `recipeStory`, `recipeDescription`,`recipeIngredients`,
		`recipeCookTime`, `recipeSteps`, `recipeDate`, `recipeRating`, `userId`, `mealTypeId`, `imageUrl`)
        values
			('The Sauce','The Story', 'The Description', 'Milk, Butter, Flour', 15, 'mix the stuff, heat it up', 
				'2020-10-20', 0, 1, 1, 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/12/20/0/FNK_The-Best-Tomato-Sauce_H_s4x3.jpg.rend.hgtvcom.826.620.suffix/1576855451811.jpeg'),
			('The Gravy', 'Another Story', 'Another Description', 'Not Milk, Not Butter', 10, 'do nothing, drink alc',
				'2020-10-15', 0, 2, 2, 'https://www.recipetineats.com/wp-content/uploads/2020/02/Gravy_4-SQ.jpg'),
			('Yummy Cookies', 'Yet another Story', 'Delicious', 'Milk, Eggs, Flour, Butter', 30, 'mix the stuff, heat it up, enjoy',
			'2020-11-13', 0, 2, 8, 'https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg'),
			('Korean Beef and Broccoli', 'I was searching for new recipes and wandered upon this, it is now a regular on the menu.',
            'Beef, Rice, and Broccolli in brown sugar soy sauce. I usually just use microwave broccolli.', '1/2 lb Ground Beef\n3 Garlic Cloves minced\n1/4 Cup Brown Sugar\n
            1/4 Soy Sauce\n1/4 tsp Pepper\n1/4 tsp Red Paper Flakes\n1/4 tsp Ginger\n2 tsp sesame oil\n 2 or 3 cups of rice', '20',
            'Cook Rice\nCook ground beef and garlic until no longer pink\nWhisk brown sugar, soy sauce, sesame oil, ginger, red pepper flakes, and pepper.
				Pour into ground beef and let simmer for a minute or two.\nServe over hot rice with broccoli.', '2020-11-13', 0, 4, 
                4, 'https://therecipecritic.com/wp-content/uploads/2017/04/0C4A8325.jpg'),
			('Creamy Tomato Tortellini Soup',"When I was a wee lad, my mother would make this. Now it's my turn","The creamiest, the cheesiest, the tomatoiest,
            the tortelliniest tortellini soup out there. Serve it up with a loaf of garlic bread and you'll be in carb coma heaven.", '2 Garlic Cloves minced\n
            2 tbs Olive Oil\n2(10.75oz) cans of tomato soup\n1/4 cup sun-dried tomatos\n2 cups half and half\n2 cups chicken stock\n
            1 tsp onion powder\n1 tbs itialian seasoning\n1/2 tsp salt\n1/2 tsp pepper\n1(9oz) package cheese-filled tortellini\n1/2 cup shredded parmesan cheese',
            45, 'Sauté garlic with the olive oil in a large stock pot over medium heat until golden brown. Be sure to keep an eye on it so it doesn’t get too brown or burnt.\n
            When the garlic is done, add tomato soup, tomatoes, half and half, chicken stock and spices, and bring to a simmer.\n
            Once simmering, drop tortellini into the soup. Cook according to the package directions.\n
            After tortellini are cooked, ladle soup into bowls and top with Parmesan cheese.', '2020-11-17', 0, 4, 4,
            'https://www.keyingredient.com/media/tortellini-tomato-soup-jpg_crop.jpeg/rh/creamy-tomato-tortellini-soup.jpg'),
            ('Creamy Garlic Chicken Breasts', "I was searching for new recipes to challenge myself a little bit more, this had some steps and quickness
            to it that I wasn't as comfortable with, so I went with it.", 'Chicken breasts in an irresistible garlic sauce filled with caramelized onions and garlic is a winner of a chicken dinner!',
            '2-3 large boneless and skinless chicken breasts halved horizontally to make 4\n4 tablespoons flour (all purpose or plain)\n4 tablespoons finely grated fresh Parmesan cheese\n
            2 teaspoon salt\n1 teaspoon garlic powder\n1/2 teaspoon Black cracked pepper\n5 tablespoons olive oil\n2 tablespoons butter\n
            1 small onion finely chopped\n1 whole head of garlic peeled and divided into 10-12 cloves\n1 1/4 cup chicken broth (stock)\n
            1 1/4 cup half and half or heavy cream (or evaporated milk)\n1/2 cup finely grated fresh Parmesan cheese\n2 tablespoons fresh parsley, to serve',
            70, 'Season the chicken with salt, garlic powder and pepper.\nIn a shallow bowl, combine the flour, parmesan cheese. Dredge chicken in the flour mixture; shake off excess.\n
            Heat 2 tablespoons of oil and 1 tablespoon butter in a large skillet over medium-high heat. Swirl pan to coat evenly.\n
            Fry 2-3 chicken breasts until golden on each side, cooked through and no longer pink (about 4-5 minutes each side, depending on the thickness of your chicken). Transfer to a warm plate. Set aside.\n
            Wipe pan over with a sheet of paper towel. Repeat with remaining oil, butter and chicken breasts. When cooked, transfer the chicken onto the same plate.\n
            Reduce heat to medium. Sauté the onion in the remaining oil/juices in the pan until softened.\n
            Smash 6 whole cloves of garlic with the blunt edge of the back of a knife\n
            Add the remaining oil to the pan and heat through, mixing it through the onions. Sauté smashed garlic cloves and whole garlic cloves until fragrant, about 2-3 minutes. Add the broth to deglaze the pan. Scrape up any browned bits and let simmer and reduce to half, about 5 minutes.\n
            Reduce heat to medium-low. Pour in the cream. Bring the sauce to a gentle simmer for about 2-3 minutes, combining all of the flavours together.\n
            Mix in the parmesan cheese. Continue cooking gently for about 2-3 minutes until cheese melts, while stirring occasionally. Season with salt and pepper to your taste.\n
            Add the chicken back into the pan and let simmer for a further 2-3 minutes to thicken the sauce to your liking. The chicken breast will soak up all of the delicious flavours.\n
            Garnish with parsley and a little black cracked pepper.', '2020-11-15', 0, 4, 5, 'https://cafedelites.com/wp-content/uploads/2018/12/Creamy-Garlic-Chicken-IMAGE-1-1024x1536.jpg'),
            ('Apple Pie', 'I needed a pie for thanksgiving', 'This is a sweet, tart and delicious apple pie. Guaranteed to please. Be sure to use Granny Smith apples since they work the best.', 
            '¾ cup white sugar\n2 tablespoons all-purpose flour\n½ teaspoon ground cinnamon\n¼ teaspoon ground nutmeg\n½ teaspoon lemon zest\n7 cups thinly sliced apples\n
            2 teaspoons lemon juice\n1 tablespoon butter\n1 recipe pastry for a 9 inch double crust pie\n4 tablespoons milk', 60, 'Preheat oven to 425 degrees F (220 degrees C).\n
            Mix together the sugar, flour, cinnamon, nutmeg and lemon peel.\nLine one crust in a 9-inch deep-dish pie pan. Layer 1/3 of apples into pie crust. Sprinkle with sugar mixture and repeat until done. Sprinkle with lemon juice and dot with butter.\n
            Place second pie crust on top of filling and flute the edges. Cut vents in top crust and brush with milk for a glazed appearance if desired.\nBake at 425 degrees F (220 degrees C) for 40 to 50 minutes.',
            '2019-11-28', 0, 1, 3, 'https://cdn3.tmbi.com/toh/GoogleImagesPostCard/exps6086_HB133235C07_19_4b_WEB.jpg')
            