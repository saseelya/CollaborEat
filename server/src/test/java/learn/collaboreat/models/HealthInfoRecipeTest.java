package learn.collaboreat.models;

import org.junit.jupiter.api.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.time.LocalDate;
import java.util.Set;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class HealthInfoRecipeTest {

    @Test
    void emptyHealthInfoRecipeShouldFailValidation() {
        HealthInfoRecipe healthInfoRecipe = new HealthInfoRecipe();
        healthInfoRecipe.setHealthInfoId(-2);

        Set<ConstraintViolation<HealthInfoRecipe>> violations = getViolations(healthInfoRecipe);
        assertEquals(2, violations.size());
    }

    @Test
    void emptyRecipeShouldFailValidation() {
        HealthInfoRecipe healthInfoRecipe = new HealthInfoRecipe();

        Set<ConstraintViolation<HealthInfoRecipe>> violations = getViolations(healthInfoRecipe);
        assertEquals(1, violations.size());
    }

    @Test
    void negativeHealthInfoShouldFailValidation() {
        HealthInfoRecipe healthInfoRecipe = new HealthInfoRecipe();
        Recipe recipe = makeValidRecipe();
        healthInfoRecipe.setRecipe(recipe);
        healthInfoRecipe.setHealthInfoId(-2);

        Set<ConstraintViolation<HealthInfoRecipe>> violations = getViolations(healthInfoRecipe);
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

    private Set<ConstraintViolation<HealthInfoRecipe>> getViolations(HealthInfoRecipe healthInfoRecipe) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<HealthInfoRecipe>> violations = validator.validate(healthInfoRecipe);

        return violations;
    }
}
