package learn.collaboreat.data.mappers;

import learn.collaboreat.models.MealType;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MealTypeMapper implements RowMapper<MealType> {

    @Override
    public MealType mapRow(ResultSet resultSet, int i) throws SQLException {
        MealType mealType = new MealType();
        mealType.setMealTypeId(resultSet.getInt("mealTypeId"));
        mealType.setMealTypeName(resultSet.getString("mealTypeName"));
        return mealType;
    }
}
