package learn.collaboreat.domain;


import learn.collaboreat.data.RecipeHealthInfoRepository;
import learn.collaboreat.data.RecipeRepository;
import learn.collaboreat.models.Recipe;
import learn.collaboreat.models.RecipeHealthInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Validator;
import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final RecipeHealthInfoRepository rhiRepository;

    @Autowired
    private Validator validator;

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

    public Result<Recipe> add(Recipe recipe) {
        Result<Recipe> result = new Result<>();

        if (recipe == null) {
            result.addMessage("Recipe cannot be null", ResultType.INVALID);
            return result;
        }

        if (recipe.getRecipeId() != 0) {
            result.addMessage("You cannot specify a recipe ID", ResultType.INVALID);
        }

        recipe = recipeRepository.add(recipe);
        result.setPayload(recipe);

        return result;
    }

    public Result<Recipe> update(Recipe recipe) {
        Result<Recipe> result = new Result<>();

        if (recipe == null) {
            result.addMessage("Recipe cannot be null", ResultType.INVALID);
            return result;
        }

        Boolean idExists = recipeRepository.findAll().stream()
                .anyMatch(r -> r.getRecipeId() == recipe.getRecipeId());

        if (!idExists) {
            result.addMessage("You must enter an available recipe ID", ResultType.INVALID);
        }

        return result;
    }

    public boolean deleteById(int recipeId) {
        return recipeRepository.deleteById(recipeId);
    }

    public Result<Void> addHealthInfo(RecipeHealthInfo rhi) {
        Result<Void> result = validate(rhi);

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


    private Result<Void> validate(RecipeHealthInfo rhi) {
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

