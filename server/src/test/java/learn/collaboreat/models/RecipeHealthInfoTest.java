package learn.collaboreat.models;

import org.junit.jupiter.api.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class RecipeHealthInfoTest {

    private ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    private Validator validator = factory.getValidator();

    @Test
    void blankRecipeHealthInfoShouldFailValidation() {
        RecipeHealthInfo rhi = new RecipeHealthInfo();

        Set<ConstraintViolation<RecipeHealthInfo>> violations = validator.validate(rhi);

        assertEquals(1, violations.size());
    }

    @Test
    void negativeRecipeIdShouldFailValidation() {
        RecipeHealthInfo rhi = makeRecipeHealthInfo();
        rhi.setRecipeId(-1);

        Set<ConstraintViolation<RecipeHealthInfo>> violations = validator.validate(rhi);

        assertEquals(1, violations.size());
    }

    @Test
    void nullHealthInfoShouldFailValidation() {
        RecipeHealthInfo rhi = makeRecipeHealthInfo();
        rhi.setHealthInfo(null);

        Set<ConstraintViolation<RecipeHealthInfo>> violations = validator.validate(rhi);

        assertEquals(1, violations.size());
    }

    @Test
    void goodHealthInfoShouldPassValidation() {
        RecipeHealthInfo rhi = makeRecipeHealthInfo();

        Set<ConstraintViolation<RecipeHealthInfo>> violations = validator.validate(rhi);

        assertTrue(violations.isEmpty());
    }

    RecipeHealthInfo makeRecipeHealthInfo() {
        RecipeHealthInfo rhi = new RecipeHealthInfo();
        rhi.setHealthInfo(makeHealthInfo());
        rhi.setRecipeId(1);
        return rhi;
    }

    HealthInfo makeHealthInfo() {
        HealthInfo hi = new HealthInfo();
        hi.setHealthInfoId(1);
        hi.setHealthInfoName("Test HealthInfo Name");
        return hi;
    }
}