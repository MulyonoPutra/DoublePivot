package com.labs.doublepivot.controllers;

import com.labs.doublepivot.domain.dto.CategoryDTO;
import com.labs.doublepivot.domain.dto.CategoryUpdateDTO;
import com.labs.doublepivot.domain.entities.Category;
import com.labs.doublepivot.exceptions.CategoryException;
import com.labs.doublepivot.services.CategoryService;
import com.labs.doublepivot.utils.HttpResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.labs.doublepivot.constants.Constants.*;

@SuppressWarnings("ALL")
@RestController
@RequestMapping("v1/categories")
public class CategoryController {

    @Autowired
    private final CategoryService categoryService;

    @Autowired
    private final ModelMapper mapper;

    private final HttpResponse httpResponse;

    public CategoryController(CategoryService categoryService, ModelMapper mapper, HttpResponse httpResponse) {
        this.categoryService = categoryService;
        this.mapper = mapper;
        this.httpResponse = httpResponse;
    }

    // @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<HttpResponse> findAll() throws CategoryException {
        try {
            List<Category> categoryCollections = categoryService.findAll();
            if (categoryCollections.isEmpty()) {
                return HttpResponse.response(HttpStatus.OK, EMPTY_CATEGORY, categoryCollections);
            }
            return HttpResponse.response(HttpStatus.OK, SUCCESSFULLY, categoryCollections);
        } catch (CategoryException e) {
            return HttpResponse.response(HttpStatus.MULTI_STATUS, EMPTY_CATEGORY, null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<HttpResponse> findById(@PathVariable UUID id) throws CategoryException {
        try {
            Optional<Category> category = categoryService.findById(id);
            if (category.isPresent()) {
                return HttpResponse.response(HttpStatus.OK, SUCCESSFULLY, category);
            }
            return HttpResponse.response(HttpStatus.OK, CATEGORY_ID_IS_NOT_EXIST, category);
        } catch (CategoryException e) {
            throw new CategoryException(SOMETHING_WENT_WRONG);
        }
    }

    @PostMapping
    public ResponseEntity<HttpResponse> save(@Valid @RequestBody CategoryDTO categoryDTO) throws CategoryException {
        Category categoryMapper = mapper.map(categoryDTO, Category.class);
        Category categories = categoryService.save(categoryMapper);
        try {
            Category categorySaved = categoryService.save(categories);
            return HttpResponse.response(HttpStatus.OK, CREATED, categorySaved);
        } catch (CategoryException e) {
            throw new CategoryException(SOMETHING_WENT_WRONG);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<HttpResponse> update(@PathVariable(value = "id") UUID id, @RequestBody CategoryDTO categoryDTO) throws CategoryException {
        try {
            CategoryUpdateDTO updated = categoryService.update(id, categoryDTO);
            return HttpResponse.response(HttpStatus.OK, UPDATED, updated);
        } catch (CategoryException e) {
            throw new CategoryException(SOMETHING_WENT_WRONG);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpResponse> delete(@PathVariable UUID id) throws CategoryException {
        try {
            categoryService.delete(id);
            List<Category> categoryCollection = categoryService.findAll();
            return HttpResponse.response(HttpStatus.OK, DELETED, categoryCollection);
        } catch (CategoryException e) {
            throw new CategoryException(CATEGORY_ID_IS_NOT_EXIST);
        }
    }

}
