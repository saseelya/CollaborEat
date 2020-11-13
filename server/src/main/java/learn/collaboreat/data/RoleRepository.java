package learn.collaboreat.data;

import learn.collaboreat.models.AppRole;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RoleRepository {

    private final JdbcTemplate jdbcTemplate;

    public RoleRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<AppRole> findAll() {
        final String sql = "select roleId, `name` from role;";
        return jdbcTemplate.query(sql, (rs, rowId) -> {
            AppRole role = new AppRole();
            role.setAppRoleId(rs.getInt("roleId"));
            role.setName(rs.getString("name"));
            return role;
        });
    }
}
