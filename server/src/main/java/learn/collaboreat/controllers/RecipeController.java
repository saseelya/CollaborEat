package learn.collaboreat.controllers;

import learn.collaboreat.domain.RecipeService;
import learn.collaboreat.domain.Result;
import learn.collaboreat.models.Recipe;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/recipe")
public class RecipeController {

    private final RecipeService service;

    public RecipeController(RecipeService service) {
        this.service = service;
    }
    
    @GetMapping
    public List<Recipe> findAll() {
        return service.findAll();
    }

    @GetMapping("/{recipeId}")
    public ResponseEntity<Recipe> findById(@PathVariable int recipeId) {
        Recipe recipe = service.findById(recipeId);
        if (recipe == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(recipe);
    }

    @PostMapping("/add")
    public ResponseEntity<Object> add(@RequestBody Recipe recipe) {
        Result<Recipe> result = service.add(recipe);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/edit/{recipeId}")
    public ResponseEntity<Object> update(
            @PathVariable int recipeId, @RequestBody Recipe recipe) {
        if (recipeId != recipe.getRecipeId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<Recipe> result = service.update(recipe);
        for (String m : result.getMessages()) {
            System.out.println(m);
        }
        System.out.println(result.getPayload().toString());
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/delete/{recipeId}")
    public ResponseEntity<Object> deleteById(@PathVariable int recipeId, @RequestBody Recipe recipe) {
        if (service.deleteById(recipeId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/user/{userId}")
    public List<Recipe> findByUser(@PathVariable int userId) {
        return service.findAll().stream().filter(recipe ->
                recipe.getUserId() == userId)
                .collect(Collectors.toList());
    }

    @GetMapping("/mealType/all/{mealTypeId}")
    public List<Recipe> findByMealTypeAll(@PathVariable int mealTypeId) {
        return service.findAll().stream().filter(recipe ->
                recipe.getMealTypeId() == mealTypeId)
                .collect(Collectors.toList());
    }

    @GetMapping("/mealType/{mealTypeId}")
    public List<Recipe> findByMealType(@PathVariable int mealTypeId) {
        return service.findAll().stream().filter(recipe ->
                recipe.getMealTypeId() == mealTypeId)
                .limit(6)
                .collect(Collectors.toList());
    }

    @GetMapping("/food/{food}")
    public List<Recipe> findByFood(@PathVariable String food) {
        return service.findAll().stream().filter(recipe ->
                recipe.getRecipeName().toUpperCase().contains(food.toUpperCase()) ||
                recipe.getRecipeIngredients().toUpperCase().contains((food.toUpperCase())))
                .collect(Collectors.toList());
    }

    @GetMapping("/date")
    public List<Recipe> findByDate() {
        return service.findByDate();
    }
}
