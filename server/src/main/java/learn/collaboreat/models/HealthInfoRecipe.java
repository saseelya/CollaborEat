package learn.collaboreat.models;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

public class HealthInfoRecipe {

    @PositiveOrZero(message = "Health Info ID must be zero or positive.")
    private int healthInfoId;
    @NotNull(message = "Health Info must not be null.")
    private Recipe recipe;

    public int getHealthInfoId() {
        return healthInfoId;
    }

    public void setHealthInfoId(int healthInfoId) {
        this.healthInfoId = healthInfoId;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }
}
