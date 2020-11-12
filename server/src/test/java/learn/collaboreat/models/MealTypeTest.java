package learn.collaboreat.models;

import org.junit.jupiter.api.Test;
import org.springframework.test.context.TestPropertySource;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

public class MealTypeTest {

    @Test
    void blankMealTypeShouldFailValidation() {
        MealType mealType = new MealType();

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<MealType>> violations = validator.validate(mealType);

        assertEquals(1, violations.size());
    }

    @Test
    void negativeIdShouldFailValidation() {
        MealType mealType = makeMealType();
        mealType.setMealTypeId(-5);

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<MealType>> violations = validator.validate(mealType);

        assertEquals(1, violations.size());
    }

    @Test
    void blankNameShouldFailValidation() {
        MealType mealType = makeMealType();
        mealType.setMealTypeName("  ");

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<MealType>> violations = validator.validate(mealType);

        assertEquals(1, violations.size());
    }

    @Test
    void nullNameShouldFailValidation() {
        MealType mealType = makeMealType();
        mealType.setMealTypeName(null);

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<MealType>> violations = validator.validate(mealType);

        assertEquals(1, violations.size());
    }

    @Test
    void goodMealTypeShouldPassValidation() {
        MealType mealType = makeMealType();

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<MealType>> violations = validator.validate(mealType);

        assertTrue(violations.isEmpty());
    }

    MealType makeMealType() {
        MealType mealType = new MealType();
        mealType.setMealTypeId(1);
        mealType.setMealTypeName("Test MealType Name");
        return mealType;
    }
}
