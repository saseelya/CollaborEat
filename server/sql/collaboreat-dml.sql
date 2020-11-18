USE `collaboreat-schema` ;

insert into `collaboreat-schema`.`recipe`(`recipeName`, `recipeStory`, `recipeDescription`,`recipeIngredients`,
		`recipeCookTime`, `recipeSteps`, `recipeDate`, `recipeRating`, `userId`, `mealTypeId`, `imageUrl`)
        values
			('The Sauce','The Story', 'The Description', 
            'Milk
            Butter
            Flour', 
            15, 
            'mix the stuff
            heat it up', 
			'2020-10-20', 0, 1, 1, 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/12/20/0/FNK_The-Best-Tomato-Sauce_H_s4x3.jpg.rend.hgtvcom.826.620.suffix/1576855451811.jpeg'),
			
            ('The Gravy', 'Another Story', 'Another Description', 
            'Not Milk
            Not Butter', 
            10, 
            'do nothing
            drink alc',
			'2020-10-15', 0, 2, 2, 'https://www.recipetineats.com/wp-content/uploads/2020/02/Gravy_4-SQ.jpg'),
			
            ('Yummy Cookies', 'Yet another Story', 'Delicious', 
            'Milk
            Eggs
            Flour
            Butter', 30,
            'mix the stuff
            heat it up
            enjoy',
			'2020-11-13', 0, 2, 8, 'https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg'),
			
            ('Korean Beef and Broccoli', 'I was searching for new recipes and wandered upon this, it is now a regular on the menu.',
            'Beef, Rice, and Broccolli in brown sugar soy sauce. I usually just use microwave broccolli.', 
            '1/2 lb Ground Beef
            3 Garlic Cloves minced
            1/4 Cup Brown Sugar
            1/4 Soy Sauce
            1/4 tsp Pepper
            1/4 tsp Red Paper Flakes
            1/4 tsp Ginger
            2 tsp sesame oil
            2 or 3 cups of rice',
            '20',
            'Cook Rice
            Cook ground beef and garlic until no longer pink
            Whisk brown sugar, soy sauce, sesame oil, ginger, red pepper flakes, and pepper.
            Pour into ground beef and let simmer for a minute or two.
            Serve over hot rice with broccoli.', 
            '2020-11-13', 0, 4, 4, 'https://therecipecritic.com/wp-content/uploads/2017/04/0C4A8325.jpg'),
			
            ('Creamy Tomato Tortellini Soup',"When I was a wee lad, my mother would make this. Now it's my turn","The creamiest, the cheesiest, the tomatoiest,
            the tortelliniest tortellini soup out there. Serve it up with a loaf of garlic bread and you'll be in carb coma heaven.",
            '2 Garlic Cloves minced
            2 tbs Olive Oil
            2(10.75oz) cans of tomato soup
            1/4 cup sun-dried tomatos
            2 cups half and half
            2 cups chicken stock
            1 tsp onion powder
            1 tbs itialian seasoning
            1/2 tsp salt
            1/2 tsp pepper
            1(9oz) package cheese-filled tortellini
            1/2 cup shredded parmesan cheese',
            45, 
            'Sauté garlic with the olive oil in a large stock pot over medium heat until golden brown. Be sure to keep an eye on it so it doesn’t get too brown or burnt.
            When the garlic is done, add tomato soup, tomatoes, half and half, chicken stock and spices, and bring to a simmer.
            Once simmering, drop tortellini into the soup. Cook according to the package directions.
            After tortellini are cooked, ladle soup into bowls and top with Parmesan cheese.', 
            '2020-11-17', 0, 4, 4,
            'https://www.keyingredient.com/media/tortellini-tomato-soup-jpg_crop.jpeg/rh/creamy-tomato-tortellini-soup.jpg'),
            
            ('Creamy Garlic Chicken Breasts', "I was searching for new recipes to challenge myself a little bit more, this had some steps and quickness
            to it that I wasn't as comfortable with, so I went with it.", 'Chicken breasts in an irresistible garlic sauce filled with caramelized onions and garlic is a winner of a chicken dinner!',
            '2-3 large boneless and skinless chicken breasts halved horizontally to make 4
            4 tablespoons flour (all purpose or plain)
            4 tablespoons finely grated fresh Parmesan cheese
            2 teaspoon salt\n1 teaspoon garlic powder
            1/2 teaspoon Black cracked pepper
            5 tablespoons olive oil
            2 tablespoons butter
            1 small onion finely chopped
            1 whole head of garlic peeled and divided into 10-12 cloves
            1 1/4 cup chicken broth (stock)
            1 1/4 cup half and half or heavy cream (or evaporated milk)
            1/2 cup finely grated fresh Parmesan cheese
            2 tablespoons fresh parsley, to serve',
            70,
            'Season the chicken with salt, garlic powder and pepper.
            In a shallow bowl, combine the flour, parmesan cheese. Dredge chicken in the flour mixture; shake off excess.
            Heat 2 tablespoons of oil and 1 tablespoon butter in a large skillet over medium-high heat. Swirl pan to coat evenly.
            Fry 2-3 chicken breasts until golden on each side, cooked through and no longer pink (about 4-5 minutes each side, depending on the thickness of your chicken). Transfer to a warm plate. Set aside.
            Wipe pan over with a sheet of paper towel. Repeat with remaining oil, butter and chicken breasts. When cooked, transfer the chicken onto the same plate.
            Reduce heat to medium. Sauté the onion in the remaining oil/juices in the pan until softened.
            Smash 6 whole cloves of garlic with the blunt edge of the back of a knife
            Add the remaining oil to the pan and heat through, mixing it through the onions. Sauté smashed garlic cloves and whole garlic cloves until fragrant, about 2-3 minutes. Add the broth to deglaze the pan. Scrape up any browned bits and let simmer and reduce to half, about 5 minutes.
            Reduce heat to medium-low. Pour in the cream. Bring the sauce to a gentle simmer for about 2-3 minutes, combining all of the flavours together.
            Mix in the parmesan cheese. Continue cooking gently for about 2-3 minutes until cheese melts, while stirring occasionally. Season with salt and pepper to your taste.
            Add the chicken back into the pan and let simmer for a further 2-3 minutes to thicken the sauce to your liking. The chicken breast will soak up all of the delicious flavours.
            Garnish with parsley and a little black cracked pepper.',
            '2020-11-15', 0, 4, 5, 'https://cafedelites.com/wp-content/uploads/2018/12/Creamy-Garlic-Chicken-IMAGE-1-1024x1536.jpg'),
            
            ('Apple Pie', 'I needed a pie for thanksgiving', 'This is a sweet, tart and delicious apple pie. Guaranteed to please. Be sure to use Granny Smith apples since they work the best.', 
            '¾ cup white sugar
            2 tablespoons all-purpose flour
            ½ teaspoon ground cinnamon
            ¼ teaspoon ground nutmeg
            ½ teaspoon lemon zest
            7 cups thinly sliced apples
            2 teaspoons lemon juice
            1 tablespoon butter
            1 recipe pastry for a 9 inch double crust pie
            4 tablespoons milk',
            60,
            'Preheat oven to 425 degrees F (220 degrees C).
            Mix together the sugar, flour, cinnamon, nutmeg and lemon peel.
            Line one crust in a 9-inch deep-dish pie pan. Layer 1/3 of apples into pie crust. Sprinkle with sugar mixture and repeat until done. Sprinkle with lemon juice and dot with butter.
            Place second pie crust on top of filling and flute the edges. Cut vents in top crust and brush with milk for a glazed appearance if desired.
            Bake at 425 degrees F (220 degrees C) for 40 to 50 minutes.',
            '2019-11-28', 0, 1, 3, 'https://cdn3.tmbi.com/toh/GoogleImagesPostCard/exps6086_HB133235C07_19_4b_WEB.jpg'),
            
            ('Spicy Grilled Cheese Sandwich', 'I like grilled cheese and I like spicy, so I invented this.', 'Grilled cheese with onions, tomatoes and jalapenos-- tastier than the original!',
            '2 tablespoons butter or margarine
            4 slices white bread
            2 slices American cheese
            1 roma (plum) tomato, thinly sliced
            ¼ small onion, chopped
            1 jalapeno pepper, chopped',
            5,
            'Heat a large skillet over low heat.
            Spread butter or margarine onto one side of two slices of bread. Place both pieces buttered side down in the skillet.
            Lay a slice of cheese on each one, and top with slices of tomato, onion and jalapeno.
            Butter one side of the remaining slices of bread, and place on top buttered side up.
            When the bottom of the sandwiches are toasted, flip and fry until brown on the other side.', '2001-12-13', 0, 1, 6, 
            'https://images.media-allrecipes.com/userphotos/5081856.jpg'),
            
            ('Skillet-Braised Brussels Sprouts', 'My partner loves brussel sprouts, but I hate them. This recipe allows me to enjoy brussel sprouts.', 
            'Brussels sprouts with bacon and garlic are skillet-braised until tender and delicious.', 
            '4 slices thick-cut bacon, sliced into 1/4-inch strips, or more to taste
            1 pound Brussels sprouts, trimmed and halved, or more to taste
            1 clove garlic, thinly sliced, or more to taste
            ½ cup chicken stock, or more as needed
            1 tablespoon butter, or to taste
            1 tablespoon balsamic vinegar, or more to taste
            salt and ground black pepper to taste', 
            40, 
            'Place bacon in a large skillet over medium-low heat; cook until just crisp, about 10 minutes. Transfer bacon to a paper towel-lined plate, reserving bacon grease in skillet.
            Increase heat to medium-high under skillet; saute Brussels sprouts in the bacon grease until lightly browned, 2 to 3 minutes. Add garlic to Brussels sprouts; saute until garlic is fragrant, 1 to 2 minutes.
            Pour chicken stock over Brussels sprouts mixture and cover skillet with a lid; simmer until Brussels sprouts are bright green, 4 to 5 minutes. Remove lid and continue simmering until liquid is evaporated and sprouts are tender, about 5 more minutes.
            Remove skillet from heat and stir bacon, butter, vinegar, salt, and pepper into Brussels sprouts mixture until butter is melted.', 
            '2005-07-16',
            0, 3, 7, 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F7923937.jpg&q=85');
            
            