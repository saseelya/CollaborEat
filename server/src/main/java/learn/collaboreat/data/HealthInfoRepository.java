package learn.collaboreat.data;

import learn.collaboreat.models.HealthInfo;

import java.util.List;

public interface HealthInfoRepository {
    List<HealthInfo> findAll();

    HealthInfo findById(int healthInfoId);

    HealthInfo add(HealthInfo hi);
}
