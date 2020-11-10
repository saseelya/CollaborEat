package learn.collaboreat.models;

import org.junit.jupiter.api.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.time.LocalDate;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class RecipeTest {

    @Test
    void emptyRecipeShouldFailValidation() {

        Recipe recipe = new Recipe();
        recipe.setMealTypeId(-2);
        recipe.setUserId(-2);
        recipe.setRecipeRating(-2);
        recipe.setRecipeCookTime(-2);

//        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
//        Validator validator = factory.getValidator();
//        Set<ConstraintViolation<Recipe>> violations = validator.validate(recipe);

        Set<ConstraintViolation<Recipe>> violations = getViolations(recipe);
        assertEquals(9, violations.size());
    }

    @Test
    void emptyRecipeNameShouldFail(){
        Recipe recipe = makeValidRecipe();
        recipe.setRecipeName("");

        Set<ConstraintViolation<Recipe>> violations = getViolations(recipe);
        assertEquals(1, violations.size());
    }

    @Test
    void emptyRecipeStoryShouldFail(){
        Recipe recipe = makeValidRecipe();
        recipe.setRecipeStory("");

        Set<ConstraintViolation<Recipe>> violations = getViolations(recipe);
        assertEquals(1, violations.size());
    }

    @Test
    void emptyRecipeIngredientsShouldFail(){
        Recipe recipe = makeValidRecipe();
        recipe.setRecipeIngredients("");

        Set<ConstraintViolation<Recipe>> violations = getViolations(recipe);
        assertEquals(1, violations.size());
    }

    @Test
    void emptyRecipeDescriptionShouldFail(){
        Recipe recipe = makeValidRecipe();
        recipe.setRecipeDescription("");

        Set<ConstraintViolation<Recipe>> violations = getViolations(recipe);
        assertEquals(1, violations.size());
    }

    @Test
    void negativeRecipeCookTimeShouldFail(){
        Recipe recipe = makeValidRecipe();
        recipe.setRecipeCookTime(-2);

        Set<ConstraintViolation<Recipe>> violations = getViolations(recipe);
        assertEquals(1, violations.size());
    }

    @Test
    void emptyRecipeStepsShouldFail(){
        Recipe recipe = makeValidRecipe();
        recipe.setRecipeSteps("");

        Set<ConstraintViolation<Recipe>> violations = getViolations(recipe);
        assertEquals(1, violations.size());
    }

    @Test
    void negativeRecipeRatingShouldFail(){
        Recipe recipe = makeValidRecipe();
        recipe.setRecipeRating(-2);

        Set<ConstraintViolation<Recipe>> violations = getViolations(recipe);
        assertEquals(1, violations.size());
    }

    @Test
    void negativeUserIdShouldFail(){
        Recipe recipe = makeValidRecipe();
        recipe.setUserId(-2);

        Set<ConstraintViolation<Recipe>> violations = getViolations(recipe);
        assertEquals(1, violations.size());
    }

    @Test
    void negativeMealTypeIdShouldFail(){
        Recipe recipe = makeValidRecipe();
        recipe.setMealTypeId(-2);

        Set<ConstraintViolation<Recipe>> violations = getViolations(recipe);
        assertEquals(1, violations.size());
    }

    private Recipe makeValidRecipe() {
        Recipe recipe = new Recipe();

        recipe.setRecipeId(1);
        recipe.setRecipeName("Test Name");
        recipe.setRecipeStory("Now here's the story from A to Z, you wanna recipe you gotta listen carefully");
        recipe.setRecipeDescription("Test Description");
        recipe.setRecipeIngredients("Test Ingredients");
        recipe.setRecipeCookTime(2);
        recipe.setRecipeSteps("Test Steps");
        recipe.setRecipeDate(LocalDate.now());
        recipe.setRecipeRating(5.0);
        recipe.setUserId(1);
        recipe.setMealTypeId(1);

        return recipe;
    }

    private Set<ConstraintViolation<Recipe>> getViolations(Recipe recipe) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Recipe>> violations = validator.validate(recipe);

        return violations;
    }
}
