package learn.collaboreat.models;


import javax.validation.constraints.*;
import java.util.Objects;

public class Feedback {

    @PositiveOrZero(message = "ID must be zero or positive.")
    private int feedbackId;

    @NotBlank(message = "Comment must not be blank.")
    private String feedbackComment;

    @Min(value = 1, message = "Rating must be between 1 and 5.")
    @Max(value = 5, message = "Rating must be between 1 and 5.")
    private double feedbackRating;

    @Positive(message = "Recipe ID must be greater than zero.")
    private int recipeId;

    @Positive(message = "User ID must be greater than zero.")
    private int userId;

    public int getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(int feedbackId) {
        this.feedbackId = feedbackId;
    }

    public String getFeedbackComment() {
        return feedbackComment;
    }

    public void setFeedbackComment(String feedbackComment) {
        this.feedbackComment = feedbackComment;
    }

    public double getFeedbackRating() {
        return feedbackRating;
    }

    public void setFeedbackRating(int feedbackRating) {
        this.feedbackRating = feedbackRating;
    }

    public int getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Feedback feedback = (Feedback) o;
        return feedbackId == feedback.feedbackId &&
                feedbackRating == feedback.feedbackRating &&
                recipeId == feedback.recipeId &&
                userId == feedback.userId &&
                Objects.equals(feedbackComment, feedback.feedbackComment);
    }

    @Override
    public int hashCode() {
        return Objects.hash(feedbackId, feedbackComment, feedbackRating, recipeId, userId);
    }
}
