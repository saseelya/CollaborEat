package learn.collaboreat.data;

import learn.collaboreat.data.mappers.MealTypeMapper;
import learn.collaboreat.models.MealType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class MealTypeJDBCTemplateRepository implements MealTypeRepository{

    private final JdbcTemplate jdbcTemplate;

    public MealTypeJDBCTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<MealType> findAll() {
        final String sql = "select mealTypeId, mealTypeName from mealType;";
        return jdbcTemplate.query(sql, new MealTypeMapper());
    }

    @Override
    public MealType findById(int mealTypeId) {
        final String sql = "select mealTypeId, mealTypeName from mealType " +
                "where mealTypeId = ?;";

        MealType mealType = jdbcTemplate.query(sql, new MealTypeMapper(), mealTypeId).stream()
                .findFirst().orElse(null);

        return mealType;
    }

    @Override
    public MealType add(MealType mealType) {
        final String sql = "insert into mealType (mealTypeName) " +
                "values (?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, mealType.getMealTypeName());
            return ps;
        }, keyHolder);
        if (rowsAffected <= 0) {
            return null;
        }
        mealType.setMealTypeId(keyHolder.getKey().intValue());
        return mealType;
    }

}
