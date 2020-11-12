package learn.collaboreat.domain;

import learn.collaboreat.data.MealTypeRepository;
import learn.collaboreat.models.MealType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class MealTypeServiceTest {

    @Autowired
    MealTypeService service;

    @MockBean
    MealTypeRepository repository;

    @Test
    void shouldFindTestMealTypeName() {
        MealType mealType = makeMealType();
        when(repository.findById(1)).thenReturn(mealType);
        MealType actual = service.findById(1);
        assertEquals(mealType, actual);
    }

    @Test
    void shouldAdd() {
        MealType mealType = makeMealType();
        mealType.setMealTypeId(0);
        MealType mockOut = makeMealType();

        when(repository.add(mealType)).thenReturn(mockOut);

        Result<MealType> actual = service.add(mealType);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotAddInvalid() {
        MealType nullMeal = null;
        when(repository.add(nullMeal)).thenReturn(null);

        Result<MealType> actual = service.add(nullMeal);
        assertEquals(ResultType.INVALID, actual.getType());

        MealType mealType = makeMealType();
        when(repository.add(mealType)).thenReturn(mealType);

        Result<MealType> actual2 = service.add(mealType);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    MealType makeMealType() {
        MealType mealType = new MealType();
        mealType.setMealTypeId(1);
        mealType.setMealTypeName("Test MealType Name");
        return mealType;
    }
}