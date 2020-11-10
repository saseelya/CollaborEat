package learn.collaboreat.models;

import javax.validation.constraints.*;
import java.util.Objects;

public class HealthInfo {

    @PositiveOrZero(message = "ID must be zero or positive.")
    private int healthInfoId;

    @NotBlank(message = "Health Info Name must not be blank.")
    private String healthInfoName;

    public int getHealthInfoId() {
        return healthInfoId;
    }

    public void setHealthInfoId(int healthInfoId) {
        this.healthInfoId = healthInfoId;
    }

    public String getHealthInfoName() {
        return healthInfoName;
    }

    public void setHealthInfoName(String healthInfoName) {
        this.healthInfoName = healthInfoName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        HealthInfo that = (HealthInfo) o;
        return getHealthInfoId() == that.getHealthInfoId() &&
                getHealthInfoName().equals(that.getHealthInfoName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getHealthInfoId(), getHealthInfoName());
    }
}
