package learn.collaboreat.controllers;

import learn.collaboreat.domain.RecipeService;
import learn.collaboreat.domain.Result;
import learn.collaboreat.models.HealthInfo;
import learn.collaboreat.models.RecipeHealthInfo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/recipe/healthInfo")
public class RecipeHealthInfoController {

    private final RecipeService service;

    public RecipeHealthInfoController(RecipeService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Object> addHealthInfo(@RequestBody RecipeHealthInfo rhi) {
        Result<Void> result = service.addHealthInfo(rhi);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{recipeId}/{healthInfoId}")
    public ResponseEntity<Object> deleteHealthInfoByKey(
            @PathVariable int recipeId, @PathVariable int healthInfoId) {
        if (service.deleteHealthInfoByKey(recipeId, healthInfoId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
