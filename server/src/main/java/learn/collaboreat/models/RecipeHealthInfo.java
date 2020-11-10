package learn.collaboreat.models;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

public class RecipeHealthInfo {

    @PositiveOrZero(message = "ID must be zero or positive.")
    private int recipeId;

    @NotNull(message = "Health Info must not be null.")
    private HealthInfo healthInfo;

    public int getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
    }

    public HealthInfo getHealthInfo() {
        return healthInfo;
    }

    public void setHealthInfo(HealthInfo healthInfo) {
        this.healthInfo = healthInfo;
    }
}
