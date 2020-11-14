package learn.collaboreat.domain;

import learn.collaboreat.data.UserRepository;
import learn.collaboreat.models.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class UserServiceTest {

    @Autowired
    UserService service;

    @MockBean
    UserRepository repository;

    @Test
    void shouldFindById() {
        User user = makeUser();

        when(repository.findById(1)).thenReturn(user);

        User actual = service.findById(1);
        assertEquals(user, actual);
    }

    @Test
    void shouldAdd() {
        User user = makeUser();
        user.setUserId(0);
        User mockOut = makeUser();

        when(repository.add(user)).thenReturn(mockOut);

        Result<User> actual = service.add(user);
        for (String m : actual.getMessages()) {
            System.out.println(m);
        }
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotAddInvalid() {
        User user = null;

        Result<User> actual = service.add(user);
        assertEquals(ResultType.INVALID, actual.getType());

        user = makeUser();

        actual = service.add(user);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldUpdate() {
        User user = makeUser();

        when(repository.update(user)).thenReturn(true);

        Result<User> actual = service.update(user);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdate() {
        User user = null;

        Result<User> actual = service.update(user);
        assertEquals(ResultType.INVALID, actual.getType());

        user = makeUser();
        user.setUserId(0);

        actual = service.update(user);
        assertEquals(ResultType.INVALID, actual.getType());

        user.setUserId(1000000);

        when(repository.update(user)).thenReturn(false);
        actual = service.update(user);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }

    @Test
    void shouldUpdatePassword() {
        User user = makeUser();

        when(repository.updatePassword(user)).thenReturn(true);

        Result<User> actual = service.updatePassword(user);
        for (String m : actual.getMessages()) {
            System.out.println(m);
        }
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateInvalidPassword() {
        User user = makeUser();
        user.setPassword("password");

        Result<User> actual = service.updatePassword(user);
        assertEquals(ResultType.INVALID, actual.getType());
    }
    
    @Test
    void shouldDelete() {
        User user = makeUser();

        when(repository.delete(user)).thenReturn(true);

        Result<User> actual = service.delete(user);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotDeleteNull() {
        User user = null;

        Result<User> actual = service.delete(user);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldNotDeleteMissing() {
        User user = makeUser();
        user.setUserId(100000);

        when(repository.delete(user)).thenReturn(false);

        Result<User> actual = service.delete(user);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }


    User makeUser() {
        User user = new User();
        user.setUserId(1);
        user.setFirstName("Dingo");
        user.setLastName("Nevada");
        user.setEmail("Faker@faker.com");
        user.setPassword("passw0rd!");
        return user;
    }
}