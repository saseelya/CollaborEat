package learn.collaboreat.data.mappers;

import learn.collaboreat.models.HealthInfo;
import learn.collaboreat.models.HealthInfoRecipe;

import learn.collaboreat.models.MealType;
import learn.collaboreat.models.Recipe;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class HealthInfoRecipeMapper implements RowMapper<HealthInfoRecipe> {

    @Override
    public HealthInfoRecipe mapRow(ResultSet resultSet, int i) throws SQLException {

        HealthInfoRecipe healthInfoRecipe = new HealthInfoRecipe();

        healthInfoRecipe.setHealthInfoId(resultSet.getInt("healthInfoId"));
        RecipeMapper recipeMapper = new RecipeMapper();
        healthInfoRecipe.setRecipe(recipeMapper.mapRow(resultSet, i));

        return healthInfoRecipe;
    }

}
