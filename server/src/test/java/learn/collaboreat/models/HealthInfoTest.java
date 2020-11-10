package learn.collaboreat.models;

import org.junit.jupiter.api.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class HealthInfoTest {

    private ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    private Validator validator = factory.getValidator();

    @Test
    void blankHealthInfoShouldFailValidation() {
        HealthInfo hi = new HealthInfo();

        Set<ConstraintViolation<HealthInfo>> violations = validator.validate(hi);

        assertEquals(1, violations.size());
    }

    @Test
    void negativeHealthInfoIdShouldFailValidation() {
        HealthInfo hi = makeHealthInfo();
        hi.setHealthInfoId(-5);

        Set<ConstraintViolation<HealthInfo>> violations = validator.validate(hi);

        assertEquals(1, violations.size());
    }

    @Test
    void blankHealthInfoNameShouldFailValidation() {
        HealthInfo hi = makeHealthInfo();
        hi.setHealthInfoName("  ");

        Set<ConstraintViolation<HealthInfo>> violations = validator.validate(hi);

        assertEquals(1, violations.size());
    }

    @Test
    void nullHealthInfoNameShouldFailValidation() {
        HealthInfo hi = makeHealthInfo();
        hi.setHealthInfoName(null);

        Set<ConstraintViolation<HealthInfo>> violations = validator.validate(hi);

        assertEquals(1, violations.size());
    }

    @Test
    void goodHealthInfoShouldPassValidation() {
        HealthInfo hi = makeHealthInfo();

        Set<ConstraintViolation<HealthInfo>> violations = validator.validate(hi);

        assertTrue(violations.isEmpty());
    }


    HealthInfo makeHealthInfo() {
        HealthInfo hi = new HealthInfo();
        hi.setHealthInfoId(1);
        hi.setHealthInfoName("Test HealthInfo Name");
        return hi;
    }

}
