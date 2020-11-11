package learn.collaboreat.controllers;

import learn.collaboreat.domain.HealthInfoService;
import learn.collaboreat.models.HealthInfo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/healthInfo")
public class HealthInfoController {

    private final HealthInfoService service;

    public HealthInfoController(HealthInfoService service) { this.service = service; }

    @GetMapping
    public List<HealthInfo> findAll() { return service.findAll(); }

}
