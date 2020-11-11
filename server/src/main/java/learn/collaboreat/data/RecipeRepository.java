package learn.collaboreat.data;

import learn.collaboreat.models.Recipe;

import java.util.List;

public interface RecipeRepository {

    List<Recipe> findAll();

    Recipe findById(int recipeId);

    Recipe add(Recipe recipe);

    boolean update(Recipe recipe);

    boolean deleteById(int recipeId);
}
