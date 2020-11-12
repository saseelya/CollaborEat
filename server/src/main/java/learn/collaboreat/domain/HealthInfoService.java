package learn.collaboreat.domain;

import learn.collaboreat.data.HealthInfoRepository;
import learn.collaboreat.models.HealthInfo;
import learn.collaboreat.models.MealType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HealthInfoService {

    private final HealthInfoRepository repository;

    public HealthInfoService(HealthInfoRepository repository) { this.repository = repository; }

    public List<HealthInfo> findAll() { return repository.findAll(); }

    public HealthInfo findById(int healthInfoId) { return repository.findById(healthInfoId); }

    public Result<HealthInfo> add(HealthInfo hi) {
        Result<HealthInfo> result = new Result<>();
        if (hi == null) {
            result.addMessage("Health Info must exist.", ResultType.INVALID);
            return result;
        }

        if (hi.getHealthInfoId() != 0) {
            result.addMessage("Meal Type ID must be zero for addition.", ResultType.INVALID);
            return result;
        }

        hi = repository.add(hi);
        result.setPayload(hi);
        return result;
    }

}
