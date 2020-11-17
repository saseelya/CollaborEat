package learn.collaboreat.data;

import learn.collaboreat.data.mappers.RecipeHealthInfoMapper;
import learn.collaboreat.models.RecipeHealthInfo;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RecipeHealthInfoJDBCTemplateRepository implements RecipeHealthInfoRepository {

    private final JdbcTemplate jdbcTemplate;

    public RecipeHealthInfoJDBCTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<RecipeHealthInfo> findAll() {
        final String sql = "select rhi.recipeId, rhi.healthInfoId, h.healthInfoName " +
                "from recipeHealthInfo rhi " +
                "join recipe r on rhi.recipeId = r.recipeId " +
                "join healthInfo h on rhi.healthInfoId = h.healthInfoId;";
        return jdbcTemplate.query(sql, new RecipeHealthInfoMapper());
    }

    @Override
    public boolean add(RecipeHealthInfo recipeHealthInfo) {
        final String sql = "insert into recipeHealthInfo (recipeId, healthInfoId) values " +
                "(?,?);";

        return jdbcTemplate.update(sql,
                recipeHealthInfo.getRecipeId(),
                recipeHealthInfo.getHealthInfo().getHealthInfoId()) > 0;
    }

    @Override
    public boolean deleteByKey(int recipeId, int healthInfoId) {
        final String sql = "delete from recipeHealthInfo " +
                "where recipeId = ? and healthInfoId = ?;";

        return jdbcTemplate.update(sql, recipeId, healthInfoId) > 0;
    }

    @Override
    public List<RecipeHealthInfo> findByRecipeId(int recipeId) {
        final String sql = "select rhi.recipeId, rhi.healthInfoId, hi.healthInfoName " +
                "from recipeHealthInfo rhi " +
                "inner join healthInfo hi on hi.healthInfoId = rhi.healthInfoId " +
                "where recipeId = ? ;";

        return jdbcTemplate.query(sql, new RecipeHealthInfoMapper(), recipeId);
    }

}
