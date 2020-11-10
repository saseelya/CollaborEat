package learn.collaboreat.data.mappers;

import learn.collaboreat.models.Feedback;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class FeedbackMapper implements RowMapper<Feedback> {

    @Override
    public Feedback mapRow(ResultSet resultSet, int i) throws SQLException {
        Feedback feedback = new Feedback();
        feedback.setFeedbackId(resultSet.getInt("feedbackId"));
        feedback.setFeedbackComment(resultSet.getString("feedbackComment"));
        feedback.setFeedbackRating(resultSet.getInt("feedbackRating"));
        feedback.setRecipeId(resultSet.getInt("recipeId"));
        feedback.setUserId(resultSet.getInt("userId"));
        return feedback;
    }
}
