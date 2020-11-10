package learn.collaboreat.data;

import learn.collaboreat.data.mappers.HealthInfoMapper;
import learn.collaboreat.models.HealthInfo;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class HealthInfoJDBCTemplateRepository implements HealthInfoRepository {

    private final JdbcTemplate jdbcTemplate;

    public HealthInfoJDBCTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<HealthInfo> findAll() {
        final String sql = "select `healthInfoId`, `healthInfoName` " +
                "from healthInfo;";
        return jdbcTemplate.query(sql, new HealthInfoMapper());
    }

    @Override
    public HealthInfo findById(int healthInfoId) {
        final String sql = "select `healthInfoId`, `healthInfoName` "
                + "from healthInfo "
                + "where healthInfoId = ?;";
        try {
            return jdbcTemplate.queryForObject(sql, new HealthInfoMapper(), healthInfoId);
        } catch (EmptyResultDataAccessException ex) {
            return null;
        }
    }

    @Override
    public HealthInfo add(HealthInfo hi) {
        if (hi.getHealthInfoName() == null) {
            return null;
        }

        final String sql = "insert into healthInfoId (`healthInfoName`) values (?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, hi.getHealthInfoName());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        hi.setHealthInfoId(keyHolder.getKey().intValue());
        return hi;
    }

}
