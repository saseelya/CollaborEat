package learn.collaboreat.models;

public class HealthInfoRecipe {

    private int healthInfoId;
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
