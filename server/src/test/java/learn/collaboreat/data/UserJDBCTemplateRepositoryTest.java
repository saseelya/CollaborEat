package learn.collaboreat.data;

import learn.collaboreat.models.Recipe;
import learn.collaboreat.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class UserJDBCTemplateRepositoryTest {

    final static int NEXT_ID = 3;

    @Autowired
    UserJDBCTemplateRepository repository;

    @Autowired
    RecipeRepository recipeRepository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<User> users = repository.findAll();

        assertNotNull(users);
        assertEquals(2, users.size());
    }

    @Test
    void shouldFindById() {
        User user = repository.findById(1);

        assertNotNull(user);
        assertEquals("Dingo", user.getFirstName());
        assertEquals(1, user.getRecipes().size());
    }

    @Test
    void shouldNotFindMissingId() {
        User user = repository.findById(-10);

        assertNull(user);
    }

    @Test
    void shouldAdd() {
        User user = makeUser();
        user.setUserId(0);

        user = repository.add(user);

        assertNotNull(user);
        assertEquals(NEXT_ID, user.getUserId());
    }

    @Test
    void shouldUpdate() {
        User user = makeUser();
        user.setUserId(1);

        assertTrue(repository.update(user));
    }

    @Test
    void shouldDelete() {
        User user = repository.findById(1);

        assertTrue(repository.delete(user));
        List<Recipe> recipes = recipeRepository.findAll();
        assertEquals(1, recipes.size());
    }

    User makeUser() {
        User user = new User();
        user.setUserId(0);
        user.setFirstName("Dingo");
        user.setLastName("Nevada");
        user.setEmail("fake@faker.com");
        user.setPassword("password");
        return user;
    }

}