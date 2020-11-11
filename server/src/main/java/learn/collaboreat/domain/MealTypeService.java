package learn.collaboreat.domain;

import learn.collaboreat.data.MealTypeJDBCTemplateRepository;
import learn.collaboreat.models.MealType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MealTypeService {

    private final MealTypeJDBCTemplateRepository repository;

    public MealTypeService(MealTypeJDBCTemplateRepository repository) {
        this.repository = repository;
    }

    public List<MealType> findAll() {
        return repository.findAll();
    }

    public MealType findById(int mealTypeId) {
        return repository.findById(mealTypeId);
    }

    public Result<MealType> add(MealType mealType) {
        Result<MealType> result = new Result<>();
        if (mealType == null) {
            result.addMessage("Meal Type must exist.", ResultType.INVALID);
            return result;
        }

        if (mealType.getMealTypeId() != 0) {
            result.addMessage("Meal Type ID must be zero for addition.", ResultType.INVALID);
            return result;
        }

        mealType = repository.add(mealType);
        result.setPayload(mealType);
        return result;
    }
}
