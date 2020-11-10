package learn.collaboreat.models;


import org.junit.jupiter.api.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

public class FeedbackTest {

    @Test
    void emptyFeedbackShouldFailValidation() {
        Feedback feedback = new Feedback();

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Feedback>> violations = validator.validate(feedback);

        assertEquals(4, violations.size());
    }

    @Test
    void negativeIdShouldFailValidation() {
        Feedback feedback = makeFeedback();
        feedback.setFeedbackId(-1);

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Feedback>> violations = validator.validate(feedback);

        assertEquals(1, violations.size());
    }

    @Test
    void blankCommentShouldFailValidation() {
        Feedback feedback = makeFeedback();
        feedback.setFeedbackComment("   ");

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Feedback>> violations = validator.validate(feedback);

        assertEquals(1, violations.size());
    }

    @Test
    void nullCommentShouldFailValidation() {
        Feedback feedback = makeFeedback();
        feedback.setFeedbackComment(null);

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Feedback>> violations = validator.validate(feedback);

        assertEquals(1, violations.size());
    }

    @Test
    void zeroFeedbackRatingShouldFailValidation() {
        Feedback feedback = makeFeedback();
        feedback.setFeedbackRating(0);

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Feedback>> violations = validator.validate(feedback);

        assertEquals(1, violations.size());
    }

    @Test
    void sixFeedbackRatingShouldFailValidation() {
        Feedback feedback = makeFeedback();
        feedback.setFeedbackRating(6);

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Feedback>> violations = validator.validate(feedback);

        assertEquals(1, violations.size());
    }

    @Test
    void goodFeedbackShouldPassValidations() {
        Feedback feedback = makeFeedback();

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Feedback>> violations = validator.validate(feedback);

        assertTrue(violations.isEmpty());
    }

    Feedback makeFeedback() {
        Feedback feedback = new Feedback();
        feedback.setFeedbackId(1);
        feedback.setFeedbackComment("This is a test feedback");
        feedback.setFeedbackRating(3);
        feedback.setUser(new User());
        feedback.setRecipe(new Recipe());
        return feedback;
    }
}