package learn.collaboreat.models;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

public class Recipe {

    private int recipeId;
    @NotBlank(message = "Recipe name is required.")
    private String recipeName;
    @NotBlank(message = "Recipe story is required.")
    private String recipeStory;
    @NotBlank(message = "Recipe description is required.")
    private String recipeDescription;
    @NotBlank(message = "Recipe ingredients are required.")
    private String recipeIngredients;
    @NotBlank(message = "Recipe cook time is required.")
    private int recipeCookTime;
    @NotBlank(message = "Recipe steps are required.")
    private String recipeSteps;
    @NotBlank(message = "Recipe date is required.")
    private LocalDate recipeDate;
    private int recipeRating;

    public int getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
    }

    public String getRecipeName() {
        return recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }

    public String getRecipeStory() {
        return recipeStory;
    }

    public void setRecipeStory(String recipeStory) {
        this.recipeStory = recipeStory;
    }

    public String getRecipeDescription() {
        return recipeDescription;
    }

    public void setRecipeDescription(String recipeDescription) {
        this.recipeDescription = recipeDescription;
    }

    public String getRecipeIngredients() {
        return recipeIngredients;
    }

    public void setRecipeIngredients(String recipeIngredients) {
        this.recipeIngredients = recipeIngredients;
    }

    public int getRecipeCookTime() {
        return recipeCookTime;
    }

    public void setRecipeCookTime(int recipeCookTime) {
        this.recipeCookTime = recipeCookTime;
    }

    public String getRecipeSteps() {
        return recipeSteps;
    }

    public void setRecipeSteps(String recipeSteps) {
        this.recipeSteps = recipeSteps;
    }

    public LocalDate getRecipeDate() {
        return recipeDate;
    }

    public void setRecipeDate() {
        this.recipeDate = LocalDate.now();
    }

    public int getRecipeRating() {
        return recipeRating;
    }

    public void setRecipeRating(int recipeRating) {
        this.recipeRating = recipeRating;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getMealTypeId() {
        return mealTypeId;
    }

    public void setMealTypeId(int mealTypeId) {
        this.mealTypeId = mealTypeId;
    }

    @NotBlank(message = "User Id is required.")
    private int userId; // foreign key
    @NotBlank(message = "Meal Type Id is required.")
    private int mealTypeId; //foreign key

    // TODO: list of type HealthInfoRecipe



}
