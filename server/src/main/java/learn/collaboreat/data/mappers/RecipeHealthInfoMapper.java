package learn.collaboreat.data.mappers;

import learn.collaboreat.models.HealthInfo;
import learn.collaboreat.models.RecipeHealthInfo;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RecipeHealthInfoMapper implements RowMapper<RecipeHealthInfo> {

    @Override
    public RecipeHealthInfo mapRow(ResultSet resultSet, int i) throws SQLException {

        RecipeHealthInfo rhi = new RecipeHealthInfo();
        rhi.setRecipeId(resultSet.getInt("recipeId"));

        HealthInfoMapper healthInfoMapper = new HealthInfoMapper();
        rhi.setHealthInfo(healthInfoMapper.mapRow(resultSet, i));

        return rhi;
    }
}
