package com.labs.doublepivot.services.serviceImpl;

import com.labs.doublepivot.domain.dto.CategoryDTO;
import com.labs.doublepivot.domain.dto.CategoryUpdateDTO;
import com.labs.doublepivot.domain.entities.Category;
import com.labs.doublepivot.repositories.CategoryRepository;
import com.labs.doublepivot.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Optional<Category> findById(UUID id) {
        return categoryRepository.findById(id);
    }

    @Override
    public void delete(UUID id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public CategoryUpdateDTO update(UUID id, CategoryDTO category) {
        if (categoryRepository.findById(id).isPresent()) {
            Category categoryId = categoryRepository.findById(id).get();
            categoryId.setName(category.getName());
            Category updated = categoryRepository.save(categoryId);
            return new CategoryUpdateDTO(updated.getId(), updated.getName());
        } else {
            return null;
        }
    }
}
