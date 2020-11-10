package learn.collaboreat.data;

import learn.collaboreat.models.MealType;

import java.util.List;

public interface MealTypeRepository {

    List<MealType> findAll();

    MealType findById(int MealTypeId);

    MealType add(MealType mealType);
}
