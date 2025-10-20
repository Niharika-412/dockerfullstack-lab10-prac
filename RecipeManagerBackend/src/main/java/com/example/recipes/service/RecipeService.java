package com.example.recipes.service;

import com.example.recipes.entity.Recipe;
import com.example.recipes.repository.RecipeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {
    private final RecipeRepository repo;
    public RecipeService(RecipeRepository repo){ this.repo = repo; }

    public List<Recipe> findAll(){ return repo.findAll(); }
    public Optional<Recipe> findById(Long id){ return repo.findById(id); }
    public Recipe save(Recipe r){ return repo.save(r); }
    public void deleteById(Long id){ repo.deleteById(id); }
}
