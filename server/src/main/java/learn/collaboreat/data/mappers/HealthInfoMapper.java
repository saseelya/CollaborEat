package learn.collaboreat.data.mappers;

import learn.collaboreat.models.HealthInfo;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class HealthInfoMapper implements RowMapper<HealthInfo> {

    @Override
    public HealthInfo mapRow(ResultSet resultSet, int i) throws SQLException {
        HealthInfo hi = new HealthInfo();
        hi.setHealthInfoId(resultSet.getInt("healthInfoId"));
        hi.setHealthInfoName(resultSet.getString("healthInfoName"));
        return hi;
    }
}
