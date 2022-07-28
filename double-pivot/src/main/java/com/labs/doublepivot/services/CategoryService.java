package com.labs.doublepivot.services;

import com.labs.doublepivot.domain.dto.CategoryDTO;
import com.labs.doublepivot.domain.dto.CategoryUpdateDTO;
import com.labs.doublepivot.domain.entities.Category;
import com.labs.doublepivot.exceptions.CategoryException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CategoryService {

    public Category save(Category category) throws CategoryException;

    public Optional<Category> findById(UUID id) throws CategoryException;

    public void delete(UUID id) throws CategoryException;

    public List<Category> findAll() throws CategoryException;

    public CategoryUpdateDTO update(UUID id, CategoryDTO category) throws CategoryException;

}
