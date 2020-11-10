package learn.collaboreat.models;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;
import java.util.Objects;

public class MealType {

    @PositiveOrZero(message = "ID must be zero or positive.")
    private int mealTypeId;

    @NotBlank(message = "Meal Type Name cannot be blank.")
    private String mealTypeName;

    public int getMealTypeId() {
        return mealTypeId;
    }

    public void setMealTypeId(int mealTypeId) {
        this.mealTypeId = mealTypeId;
    }

    public String getMealTypeName() {
        return mealTypeName;
    }

    public void setMealTypeName(String mealTypeName) {
        this.mealTypeName = mealTypeName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MealType mealType = (MealType) o;
        return mealTypeId == mealType.mealTypeId &&
                Objects.equals(mealTypeName, mealType.mealTypeName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(mealTypeId, mealTypeName);
    }
}
