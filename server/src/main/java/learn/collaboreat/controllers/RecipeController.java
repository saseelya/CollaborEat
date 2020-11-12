package learn.collaboreat.controllers;

import learn.collaboreat.domain.RecipeService;
import learn.collaboreat.domain.Result;
import learn.collaboreat.models.Recipe;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"localhost:3000"})
@RequestMapping("/recipe")
public class RecipeController {
    //Hey
    private final RecipeService service;

    public RecipeController(RecipeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Recipe> findAll() {
        return service.findAll();
    }

    @GetMapping("/{recipeId}/{recipeName}")
    public ResponseEntity<Recipe> findById(@PathVariable int recipeId, @PathVariable String recipeName) {
        Recipe recipe = service.findById(recipeId);
        if (recipe == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(recipe);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Recipe recipe) {
        Result<Recipe> result = service.add(recipe);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{recipeId}/{recipeName}")
    public ResponseEntity<Object> update(
            @PathVariable int recipeId, @PathVariable String recipeName, @RequestBody Recipe recipe) {
        if (recipeId != recipe.getRecipeId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<Recipe> result = service.update(recipe);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{recipeId}/{recipeName}")
    public ResponseEntity<Object> deleteById(@PathVariable int recipeId) {
        if (service.deleteById(recipeId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
