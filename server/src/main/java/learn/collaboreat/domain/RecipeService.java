package learn.collaboreat.domain;


import learn.collaboreat.data.RecipeHealthInfoRepository;
import learn.collaboreat.data.RecipeRepository;
import learn.collaboreat.models.Recipe;
import learn.collaboreat.models.RecipeHealthInfo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final RecipeHealthInfoRepository rhiRepository;

    public RecipeService(RecipeRepository recipeRepository, RecipeHealthInfoRepository rhiRepository) {
        this.recipeRepository = recipeRepository;
        this.rhiRepository = rhiRepository;
    }

    public List<Recipe> findAll() {
        return recipeRepository.findAll();
    }

    public Recipe findById(int recipeId) {
        return recipeRepository.findById(recipeId);
    }

    public List<Recipe> findByDate() {
        return recipeRepository.findByDate();
    }

    public Result<Recipe> add(Recipe recipe) {
        Result<Recipe> result = validateRecipe(recipe);

        if (recipe == null) {
            result.addMessage("Recipe cannot be null", ResultType.INVALID);
            return result;
        }

        if (recipe.getRecipeId() != 0) {
            result.addMessage("You cannot specify a recipe ID", ResultType.INVALID);
        }

        if (result.isSuccess()){
            recipe = recipeRepository.add(recipe);
            result.setPayload(recipe);
        }

        return result;
    }

    public Result<Recipe> update(Recipe recipe) {
        Result<Recipe> result = validateRecipe(recipe);

        if (recipe == null) {
            result.addMessage("Recipe cannot be null", ResultType.INVALID);
            return result;
        }

        Boolean idExists = recipeRepository.findAll().stream()
                .anyMatch(r -> r.getRecipeId() == recipe.getRecipeId());

        if (!idExists) {
            result.addMessage("You must enter an available recipe ID", ResultType.INVALID);
        }

        if (result.isSuccess()){
            if (!recipeRepository.update(recipe)) {
                result.addMessage("Something went wrong.", ResultType.NOT_FOUND);
            }
        }


        return result;
    }

    public boolean deleteById(int recipeId) {
        return recipeRepository.deleteById(recipeId);
    }

    public List<RecipeHealthInfo> findRHIByRecipeId(int recipeId) {
        return rhiRepository.findByRecipeId(recipeId);
    }

    public Result<Void> addHealthInfo(RecipeHealthInfo rhi) {
        Result<Void> result = validateRHI(rhi);

        if (!result.isSuccess()) {
            return result;
        }
        if (!rhiRepository.add(rhi)) {
            result.addMessage("Health Info not added", ResultType.INVALID);
        }

        return result;
    }

    public boolean deleteHealthInfoByKey(int recipeId, int healthInfoId) {
        return rhiRepository.deleteByKey(recipeId, healthInfoId);
    }

    private Result<Recipe> validateRecipe(Recipe recipe) {
        Result<Recipe> result = new Result<>();
        if (recipe.getRecipeName().isBlank()) {
            result.addMessage("Recipe name is required.", ResultType.INVALID);
        }
        if (recipe.getRecipeStory().isBlank()) {
            result.addMessage("Recipe story is required.", ResultType.INVALID);
        }
        if (recipe.getRecipeDescription().isBlank()) {
            result.addMessage("Recipe description is required.", ResultType.INVALID);
        }
        if (recipe.getRecipeIngredients().isBlank()) {
            result.addMessage("Recipe ingredients are required.", ResultType.INVALID);
        }
        if (recipe.getRecipeCookTime() < 0) {
            result.addMessage("Recipe cook time must be 0 or greater.", ResultType.INVALID);
        }
        if (recipe.getRecipeSteps().isBlank()) {
            result.addMessage("Recipe steps are required.", ResultType.INVALID);
        }
        if (recipe.getRecipeRating() < 0) {
            result.addMessage("Recipe rating must be 0 or greater.", ResultType.INVALID);
        }
        if (recipe.getUserId() < 0) {
            result.addMessage("User ID must be 0 or greater.", ResultType.INVALID);
        }
        if (recipe.getMealTypeId() < 0) {
            result.addMessage("Meal Type is required.", ResultType.INVALID);
        }
        return result;
    }


    private Result<Void> validateRHI(RecipeHealthInfo rhi) {
        Result<Void> result = new Result<>();

        if (rhi == null) {
            result.addMessage("RecipeHealthInfo cannot be null", ResultType.INVALID);
            return result;
        }
        if (rhi.getHealthInfo() == null) {
            result.addMessage("Health Info cannot be null", ResultType.INVALID);
        }
        if (rhi.getRecipeId() == 0) {
            result.addMessage("Recipe ID is required", ResultType.INVALID);
        }

        return result;
    }

}

