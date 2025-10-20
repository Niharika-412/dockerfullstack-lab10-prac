package com.example.recipes.controller;

import com.example.recipes.entity.Recipe;
import com.example.recipes.service.RecipeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*")
public class RecipeController {
    private final RecipeService service;
    public RecipeController(RecipeService service){ this.service = service; }

    @GetMapping
    public List<Recipe> all(){ return service.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> get(@PathVariable Long id){
        return service.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Recipe> create(@RequestBody Recipe r){
        Recipe saved = service.save(r);
        return ResponseEntity.created(URI.create("/api/recipes/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recipe> update(@PathVariable Long id, @RequestBody Recipe r){
        return service.findById(id).map(existing -> {
            existing.setTitle(r.getTitle());
            existing.setIngredients(r.getIngredients());
            existing.setInstructions(r.getInstructions());
            existing.setServings(r.getServings());
            existing.setCookTimeMinutes(r.getCookTimeMinutes());
            service.save(existing);
            return ResponseEntity.ok(existing);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
