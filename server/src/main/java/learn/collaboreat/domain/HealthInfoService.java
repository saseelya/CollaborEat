package learn.collaboreat.domain;

import learn.collaboreat.data.HealthInfoRepository;
import learn.collaboreat.models.HealthInfo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HealthInfoService {

    private final HealthInfoRepository repository;

    public HealthInfoService(HealthInfoRepository repository) { this.repository = repository; }

    public List<HealthInfo> findAll() { return repository.findAll(); }

    //findById

    //Add
}
