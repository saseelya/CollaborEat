package learn.collaboreat.controllers;

import learn.collaboreat.domain.HealthInfoService;
import learn.collaboreat.domain.Result;
import learn.collaboreat.models.HealthInfo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/healthInfo")
public class HealthInfoController {

    private final HealthInfoService service;

    public HealthInfoController(HealthInfoService service) { this.service = service; }

    @GetMapping
    public List<HealthInfo> findAll() { return service.findAll(); }

    @GetMapping("/{healthInfoId}")
    public HealthInfo findById(@PathVariable int healthInfoId) {
        HealthInfo info = service.findById(healthInfoId);
        System.out.println(info.toString());
        return service.findById(healthInfoId);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody HealthInfo hi) {
        Result<HealthInfo> result = service.add(hi);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

}
