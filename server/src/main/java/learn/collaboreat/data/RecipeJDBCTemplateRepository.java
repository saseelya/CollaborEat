package learn.collaboreat.data;

import learn.collaboreat.data.mappers.HealthInfoMapper;
import learn.collaboreat.data.mappers.HealthInfoRecipeMapper;
import learn.collaboreat.data.mappers.RecipeHealthInfoMapper;
import learn.collaboreat.data.mappers.RecipeMapper;
import learn.collaboreat.models.HealthInfo;
import learn.collaboreat.models.HealthInfoRecipe;
import learn.collaboreat.models.Recipe;
import learn.collaboreat.models.RecipeHealthInfo;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class RecipeJDBCTemplateRepository implements RecipeRepository {

    private final JdbcTemplate jdbcTemplate;

    public RecipeJDBCTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Recipe> findAll() {
        final String sql =
                "select recipeId, recipeName, recipeStory, recipeDescription, recipeIngredients, " +
                        "recipeCookTime, recipeCookTime, recipeSteps, recipeDate, recipeRating, " +
                        "userId, mealTypeId " +
                        "from recipe;";
        RecipeMapper recipeMapper = new RecipeMapper();
        return jdbcTemplate.query(sql, recipeMapper);
    }

    @Override
    public Recipe findById(int recipeId) {
        final String recipeSql =
                "select recipeId, recipeName, recipeStory, recipeDescription, recipeIngredients, " +
                        "recipeCookTime, recipeCookTime, recipeSteps, recipeDate, recipeRating, " +
                        "userId, mealTypeId " +
                        "from recipe " +
                        "where recipeId = ?;";

        Recipe recipe = jdbcTemplate.query(recipeSql, new RecipeMapper(), recipeId).stream()
                .findFirst().orElse(null);

        if (recipe != null){
            addHealthInfo(recipe);
        }
        return recipe;
    }

    @Override
    public Recipe add(Recipe recipe) {
        final String sql = "insert into recipe " +
                "(recipeId, recipeName, recipeStory, recipeDescription, recipeIngredients, recipeCookTime, " +
                "recipeSteps, recipeDate, recipeRating, userId, mealTypeId) " +
                "values (?,?,?,?,?,?,?,?,?,?,?);";


        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, recipe.getRecipeId());
            ps.setString(2, recipe.getRecipeName());
            ps.setString(3, recipe.getRecipeStory());
            ps.setString(4, recipe.getRecipeDescription());
            ps.setString(5, recipe.getRecipeIngredients());
            ps.setInt(6, recipe.getRecipeCookTime());
            ps.setString(7, recipe.getRecipeSteps());
            ps.setDate(8, Date.valueOf(recipe.getRecipeDate()));
            ps.setDouble(9, recipe.getRecipeRating());
            ps.setInt(10, recipe.getUserId());
            ps.setInt(11, recipe.getMealTypeId());

            return ps;
        }, keyHolder);
        if (rowsAffected <= 0) {
            return null;
        }
        recipe.setRecipeId(keyHolder.getKey().intValue());
        return recipe;
    }

    @Override
    public boolean update(Recipe recipe) {
        final String sql = "update recipe set " +
                "recipeName = ?, " +
                "recipeStory = ?, " +
                "recipeDescription = ?, " +
                "recipeIngredients = ?, " +
                "recipeCookTime = ?, " +
                "recipeCookTime = ?, " +
                "recipeSteps = ?, " +
                "recipeDate = ?, " +
                "recipeRating = ?, " +
                "userId = ?, " +
                "mealTypeId = ? " +
                "where recipeId = ?;";

        return jdbcTemplate.update(sql,
                recipe.getRecipeName(),
                recipe.getRecipeStory(),
                recipe.getRecipeDescription(),
                recipe.getRecipeIngredients(),
                recipe.getRecipeCookTime(),
                recipe.getRecipeSteps(),
                recipe.getRecipeDate(),
                recipe.getRecipeRating(),
                recipe.getUserId(),
                recipe.getMealTypeId(),
                recipe.getRecipeId()) > 0;
    }

    @Override
    public boolean deleteById(int recipeId) {
        jdbcTemplate.update("delete from recipeHealthInfo where recipeId = ?;", recipeId);
        return jdbcTemplate.update("delete from recipe where recipeId = ?;", recipeId) > 0;
    }


    private void addHealthInfo(Recipe recipe) {

        final String sql = "select rhi.healthInfoId, rhi.recipeId, "
                + "hi.healthInfoId, hi.healthInfoName "
                + "from recipeHealthInfo rhi "
                + "inner join healthInfo hi on rhi.healthInfoId = hi.healthInfoId "
                + "where rhi.recipeId = ?;";

        List<RecipeHealthInfo> healthInfo = jdbcTemplate.query(sql, new RecipeHealthInfoMapper(), recipe.getRecipeId());
        recipe.setHealthInfo(healthInfo);

    }
}
