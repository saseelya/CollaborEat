package learn.collaboreat.data;

import learn.collaboreat.data.mappers.FeedbackMapper;
import learn.collaboreat.models.Feedback;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class FeedbackJDBCTemplateRepository implements FeedbackRepository {

    private final JdbcTemplate jdbcTemplate;

    public FeedbackJDBCTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Feedback> findAll() {
        final String sql = "select feedbackId, feedbackComment, feedbackRating, recipeId, userId " +
                "from feedback;";
        return jdbcTemplate.query(sql, new FeedbackMapper());
    }

    @Override
    public Feedback findById(int feedbackId) {
        final String sql = "select feedbackId, feedbackComment, feedbackRating, recipeId, userId " +
                "from feedback where feedbackId = ?;";

        Feedback feedback = jdbcTemplate.query(sql, new FeedbackMapper(), feedbackId).stream()
                .findFirst().orElse(null);

        return feedback;
    }

    @Override
    public Feedback add(Feedback feedback) {
        final String sql = "insert into feedback (feedbackComment, feedbackRating, recipeId, userId) " +
                " values (?, ?, ?, ?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, feedback.getFeedbackComment());
            ps.setInt(2, (int)feedback.getFeedbackRating());
            ps.setInt(3, feedback.getRecipeId());
            ps.setInt(4, feedback.getUserId());
            return ps;
        }, keyHolder);
        if (rowsAffected <= 0) {
            return null;
        }
        feedback.setFeedbackId(keyHolder.getKey().intValue());
        return feedback;
    }

    @Override
    public boolean update(Feedback feedback) {
        final String sql = "update feedback set "
                + "feedbackComment = ?, "
                + "feedbackRating = ?, "
                + "recipeId = ?, "
                + "userId = ? "
                + "where feedbackId = ?;";

        return jdbcTemplate.update(sql,
                feedback.getFeedbackComment(),
                feedback.getFeedbackRating(),
                feedback.getRecipeId(),
                feedback.getUserId(),
                feedback.getFeedbackId()) > 0;
    }

    @Override
    public boolean deleteById(int feedbackId) {
        return jdbcTemplate.update("delete from feedback where feedbackId = ?;", feedbackId) > 0;
    }
}
