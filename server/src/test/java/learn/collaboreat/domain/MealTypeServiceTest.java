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








    MealType makeMealType() {
        MealType mealType = new MealType();
        mealType.setMealTypeId(1);
        mealType.setMealTypeName("Test MealType Name");
        return mealType;
    }
}