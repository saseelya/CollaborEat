package learn.collaboreat.data.mappers;

import learn.collaboreat.models.MealType;
import learn.collaboreat.models.Recipe;
import org.springframework.jdbc.core.RowMapper;

import javax.swing.tree.TreePath;
import java.sql.ResultSet;
import java.sql.SQLException;


public class RecipeMapper implements RowMapper<Recipe> {

    @Override
    public Recipe mapRow(ResultSet resultSet, int i) throws SQLException {
        Recipe recipe = new Recipe();

        recipe.setRecipeId(resultSet.getInt("recipeId"));
        recipe.setRecipeName(resultSet.getString("recipeName"));
        recipe.setRecipeStory(resultSet.getString("recipeStory"));
        recipe.setRecipeDescription(resultSet.getString("recipeDescription"));
        recipe.setRecipeIngredients(resultSet.getString("recipeIngredients"));
        recipe.setRecipeCookTime(resultSet.getInt("recipeCookTime"));
        recipe.setRecipeSteps(resultSet.getString("recipeSteps"));
        recipe.setRecipeDate(resultSet.getDate("recipeDate").toLocalDate());
        recipe.setRecipeRating(resultSet.getInt("recipeRating"));
        recipe.setUserId(resultSet.getInt("userId"));
        recipe.setMealTypeId(resultSet.getInt("mealTypeId"));

        return recipe;
    }
}
