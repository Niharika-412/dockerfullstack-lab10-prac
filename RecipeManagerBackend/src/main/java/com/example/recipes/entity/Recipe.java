package com.example.recipes.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/**
 * Represents a recipe entity mapped to a database table.
 */
@Entity
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 2000) // newline-separated or comma-separated
    private String ingredients;

    @Column(length = 5000)
    private String instructions;

    private Integer servings;
    private Integer cookTimeMinutes;

    // Default constructor (required by JPA)
    public Recipe() {}

    // Parameterized constructor
    public Recipe(String title, String ingredients, String instructions, Integer servings, Integer cookTimeMinutes) {
        this.title = title;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.servings = servings;
        this.cookTimeMinutes = cookTimeMinutes;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getIngredients() { return ingredients; }
    public void setIngredients(String ingredients) { this.ingredients = ingredients; }

    public String getInstructions() { return instructions; }
    public void setInstructions(String instructions) { this.instructions = instructions; }

    public Integer getServings() { return servings; }
    public void setServings(Integer servings) { this.servings = servings; }

    public Integer getCookTimeMinutes() { return cookTimeMinutes; }
    public void setCookTimeMinutes(Integer cookTimeMinutes) { this.cookTimeMinutes = cookTimeMinutes; }
}
