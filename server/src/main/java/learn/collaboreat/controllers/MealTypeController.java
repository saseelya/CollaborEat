package learn.collaboreat.controllers;

import learn.collaboreat.domain.MealTypeService;
import learn.collaboreat.domain.Result;
import learn.collaboreat.models.MealType;
import learn.collaboreat.models.Recipe;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/mealType")
public class MealTypeController {

    private final MealTypeService service;

    public MealTypeController(MealTypeService service) {
        this.service = service;
    }

    @GetMapping
    public List<MealType> findAll() {
        return service.findAll();
    }

    @GetMapping("/{mealTypeId}")
    public ResponseEntity<MealType> findById(@PathVariable int mealTypeId) {
        MealType mealType = service.findById(mealTypeId);
        if (mealType == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(mealType);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody MealType mealType) {
        Result<MealType> result = service.add(mealType);
        if (result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

}
