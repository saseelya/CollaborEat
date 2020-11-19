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
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

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
                        "userId, mealTypeId, imageUrl " +
                        "from recipe;";
        RecipeMapper recipeMapper = new RecipeMapper();
        return jdbcTemplate.query(sql, recipeMapper);
    }

    @Override
    public Recipe findById(int recipeId) {
        final String recipeSql =
                "select recipeId, recipeName, recipeStory, recipeDescription, recipeIngredients, " +
                        "recipeCookTime, recipeCookTime, recipeSteps, recipeDate, recipeRating, " +
                        "userId, mealTypeId, imageUrl " +
                        "from recipe " +
                        "where recipeId = ?;";

        Recipe recipe = jdbcTemplate.query(recipeSql, new RecipeMapper(), recipeId).stream()
                .findFirst().orElse(null);

        if (recipe != null) {
            addHealthInfo(recipe);
        }
        return recipe;
    }

    @Override
    public List<Recipe> findByDate() {
        final String sql =
                "select recipeId, recipeName, recipeStory, recipeDescription, recipeIngredients, " +
                        "recipeCookTime, recipeCookTime, recipeSteps, recipeDate, recipeRating, " +
                        "userId, mealTypeId, imageUrl " +
                        "from recipe " +
                        "order by recipeDate desc " +
                        "limit 6;";
        RecipeMapper recipeMapper = new RecipeMapper();
        return jdbcTemplate.query(sql, recipeMapper);
    }

    @Override
    public Recipe add(Recipe recipe) {
        final String sql = "insert into recipe " +
                "(recipeName, recipeStory, recipeDescription, recipeIngredients, recipeCookTime, " +
                "recipeSteps, recipeDate, recipeRating, userId, mealTypeId, imageUrl) " +
                "values (?,?,?,?,?,?,?,?,?,?,?);";


        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, recipe.getRecipeName());
            ps.setString(2, recipe.getRecipeStory());
            ps.setString(3, recipe.getRecipeDescription());
            ps.setString(4, recipe.getRecipeIngredients());
            ps.setInt(5, recipe.getRecipeCookTime());
            ps.setString(6, recipe.getRecipeSteps());
            ps.setDate(7, Date.valueOf(LocalDate.now()));
            ps.setDouble(8, recipe.getRecipeRating());
            ps.setInt(9, recipe.getUserId());
            ps.setInt(10, recipe.getMealTypeId());
            if(recipe.getImageUrl() != ""){
                ps.setString(11, recipe.getImageUrl());
            } else {
                ps.setString(11,"https://www.besthealthmag.ca/wp-content/uploads/2019/07/junk-food-1.gif");
            }

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
                "recipeSteps = ?, " +
                "recipeDate = ?, " +
                "recipeRating = ?, " +
                "userId = ?, " +
                "mealTypeId = ?, " +
                "imageUrl = ? " +
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
                recipe.getImageUrl(),
                recipe.getRecipeId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int recipeId) {
        jdbcTemplate.update("delete from recipeHealthInfo where recipeId = ?;", recipeId);
        jdbcTemplate.update("delete from feedback where recipeId = ?;", recipeId);
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
