package learn.collaboreat.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"localhost:3000"})
@RequestMapping("/recipe")
public class RecipeController {
}
