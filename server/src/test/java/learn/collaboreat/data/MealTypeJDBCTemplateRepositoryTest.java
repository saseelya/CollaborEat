package learn.collaboreat.data;

import learn.collaboreat.models.MealType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class MealTypeJDBCTemplateRepositoryTest {

    final static int NEXT_ID = 3;

    @Autowired
    MealTypeJDBCTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<MealType> mealTypes = repository.findAll();
        assertNotNull(mealTypes);
        assertTrue(mealTypes.size() == 2);
    }

    @Test
    void shouldFindById() {
        MealType mealType = repository.findById(1);

        assertNotNull(mealType);
        assertEquals("Breakfast", mealType.getMealTypeName());
    }

    @Test
    void shouldNotFindMissingId() {
        MealType mealType = repository.findById(500);

        assertNull(mealType);
    }

    @Test
    void shouldAdd() {
        MealType mealType = makeMealType();
        mealType = repository.add(mealType);

        assertEquals(NEXT_ID, mealType.getMealTypeId());
    }

    MealType makeMealType() {
        MealType mealType = new MealType();
        mealType.setMealTypeId(0);
        mealType.setMealTypeName("Test MealType Name");
        return mealType;
    }
}