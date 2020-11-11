package learn.collaboreat.models;


import org.junit.jupiter.api.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    void emptyUserShouldFailValidation() {
        User user = new User();

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<User>> violations = validator.validate(user);

        assertEquals(4, violations.size());
    }

    @Test
    void invalidEmailShouldFailValidation() {
        User user = makeUser();
        user.setEmail("bad.email.com");

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<User>> violations = validator.validate(user);

        assertEquals(1, violations.size());
    }

    @Test
    void goodUserShouldPassValidations() {
        User user = makeUser();

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<User>> violations = validator.validate(user);

        assertTrue(violations.isEmpty());
    }


    User makeUser() {
        User user = new User();
        user.setUserId(1);
        user.setFirstName("Dingo");
        user.setLastName("Nevada");
        user.setEmail("BigFake@fake.com");
        user.setPassword("password");
        return user;
    }
}