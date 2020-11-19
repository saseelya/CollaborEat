package learn.collaboreat.domain;

import learn.collaboreat.data.RecipeHealthInfoRepository;
import learn.collaboreat.data.RecipeJDBCTemplateRepository;
import learn.collaboreat.data.RecipeRepository;
import learn.collaboreat.models.Recipe;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class RecipeServiceTest {

    @Autowired
    RecipeService service;

    @MockBean
    RecipeRepository recipeRepository;


    @Test
    void shouldAddValidRecipe() {
        Recipe recipe = makeValidRecipe();
        Recipe mockOut = makeValidRecipe();
        mockOut.setRecipeId(3);

        when(recipeRepository.add(recipe)).thenReturn(mockOut);
        Result<Recipe> actual = service.add(recipe);

        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotAddWithRecipeId() {
        Recipe recipe = makeValidRecipe();
        recipe.setRecipeId(5);

        Result<Recipe> actual = service.add(recipe);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldUpdate() {
        Recipe mockOut = makeValidRecipe();
        List<Recipe> mockOuts = new ArrayList<>();
        mockOuts.add(mockOut);

        Recipe recipe = makeValidRecipe();
        recipe.setRecipeId(mockOut.getRecipeId());
        recipe.setRecipeName("updated");

        when(recipeRepository.update(recipe)).thenReturn(true);
        when(recipeRepository.findAll()).thenReturn(mockOuts);

        Result<Recipe> actual = service.update(recipe);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals("updated", recipe.getRecipeName());
    }

    @Test
    @Disabled
    void shouldNotUpdateInvalidRecipe() {
        Recipe mockOut = makeValidRecipe();
        List<Recipe> mockOuts = new ArrayList<>();
        mockOuts.add(mockOut);

        Recipe recipe = makeValidRecipe();
        recipe.setRecipeId(700);
        recipe.setRecipeName("updated");

        when(recipeRepository.update(recipe)).thenReturn(true);
        when(recipeRepository.findAll()).thenReturn(mockOuts);

        Result<Recipe> actual = service.update(recipe);
        assertEquals(ResultType.INVALID, actual.getType());

        recipe = null;
        actual = service.update(recipe);
        assertEquals(ResultType.INVALID, actual.getType());
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
