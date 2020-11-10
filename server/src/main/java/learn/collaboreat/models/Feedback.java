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
    private int feedbackRating;

    @NotNull(message = "Recipe is required to add feedback.")
    private Recipe recipe;

    @NotNull(message = "User is required to add feedback.")
    private User user;

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

    public int getFeedbackRating() {
        return feedbackRating;
    }

    public void setFeedbackRating(int feedbackRating) {
        this.feedbackRating = feedbackRating;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Feedback feedback = (Feedback) o;
        return feedbackId == feedback.feedbackId &&
                feedbackRating == feedback.feedbackRating &&
                Objects.equals(feedbackComment, feedback.feedbackComment) &&
                Objects.equals(recipe, feedback.recipe) &&
                Objects.equals(user, feedback.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(feedbackId, feedbackComment, feedbackRating, recipe, user);
    }
}
