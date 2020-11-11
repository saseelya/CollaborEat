package learn.collaboreat.data;

import learn.collaboreat.models.HealthInfo;
import learn.collaboreat.models.Recipe;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class RecipeRepositoryTest {

    @Autowired
    RecipeJDBCTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Recipe> recipes = repository.findAll();
        assertNotNull(recipes);
        assertEquals("The Sauce",recipes.get(0).getRecipeName());
        assertEquals(2, recipes.size());
    }

    @Test
    void shouldFindTheSauce() {
        Recipe recipe = repository.findById(1);
        assertNotNull(recipe);
        assertEquals("The Sauce", recipe.getRecipeName());
        assertEquals("The Story", recipe.getRecipeStory());
        assertEquals("The Description", recipe.getRecipeDescription());
        assertEquals("Milk, Butter, Flour", recipe.getRecipeIngredients());
        assertEquals(15, recipe.getRecipeCookTime());
        assertEquals("mix the stuff, heat it up", recipe.getRecipeSteps());

        assertEquals(1, recipe.getHealthInfo().size());
    }

    @Test
    void shouldNotFindOutOfRangeId() {
        Recipe recipe = repository.findById(100);
        assertNull(recipe);
    }

    @Test
    void shouldAddValidRecipe() {
        Recipe recipe = repository.add(makeValidRecipe());

        assertNotNull(recipe);
        assertEquals("Test Name", recipe.getRecipeName());
        assertEquals("Test Description", recipe.getRecipeDescription());
        assertEquals(3, repository.findAll().size());
    }

    @Test
    void shouldDeleteRecipe() {
        repository.deleteById(2);
        assertEquals(1, repository.findAll().size());

    }

    private Recipe makeValidRecipe() {
        Recipe recipe = new Recipe();

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
}
