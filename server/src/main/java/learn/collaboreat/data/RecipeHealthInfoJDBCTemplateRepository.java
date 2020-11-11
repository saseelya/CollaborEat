package learn.collaboreat.data;

import learn.collaboreat.data.mappers.RecipeHealthInfoMapper;
import learn.collaboreat.models.RecipeHealthInfo;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class RecipeHealthInfoJDBCTemplateRepository implements RecipeHealthInfoRepository {

    private final JdbcTemplate jdbcTemplate;

    public RecipeHealthInfoJDBCTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<RecipeHealthInfo> findAll() {
        final String sql = "select aa.recipeId, aa.healthInfoId" +
                "from recipeHealthInfo rhi " +
                "join recipe r on r.recipeId = rhi.recipeId " +
                "join healthInfo h on h.healthInfoId = h.healthInfoId;";
        return jdbcTemplate.query(sql, new RecipeHealthInfoMapper());
    }

    @Override
    public boolean add(RecipeHealthInfo recipeHealthInfo) {
        final String sql = "insert into recipeHealthInfo (recipeId, healthInfoId) values " +
                "(?,?);";

        return jdbcTemplate.update(sql,
                recipeHealthInfo.getRecipeId(),
                recipeHealthInfo.getHealthInfo()) > 0;
    }

    @Override
    public boolean deleteByKey(int recipeId, int healthInfoId) {
        final String sql = "delete from recipeHealthInfo " +
                "where recipeId = ? and healthInfoId = ?;";

        return jdbcTemplate.update(sql, recipeId, healthInfoId) > 0;
    }

}
