package com.labs.doublepivot.controllers;

import com.labs.doublepivot.domain.dto.PostDTO;
import com.labs.doublepivot.domain.dto.PostUpdateDTO;
import com.labs.doublepivot.domain.dto.SearchDTO;
import com.labs.doublepivot.domain.entities.Post;
import com.labs.doublepivot.domain.entities.User;
import com.labs.doublepivot.exceptions.PostException;
import com.labs.doublepivot.repositories.PostRepository;
import com.labs.doublepivot.repositories.UserRepository;
import com.labs.doublepivot.services.PostService;
import com.labs.doublepivot.utils.HttpResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.labs.doublepivot.constants.Constants.*;


@SuppressWarnings("all")
@RestController
@RequestMapping("v1/post")
public class PostController {

    @Autowired
    private final PostService postService;

    @Autowired
    private final ModelMapper mapper;
    private final HttpResponse httpResponse;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public PostController(
            PostService postService,
            ModelMapper mapper,
            HttpResponse httpResponse,
            UserRepository userRepository,
            PostRepository postRepository) {
        this.postService = postService;
        this.mapper = mapper;
        this.httpResponse = httpResponse;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    @GetMapping
    public ResponseEntity<HttpResponse> findAll() throws PostException {
        try {
            List<Post> categoryCollections = postService.findAll();
            if (categoryCollections.isEmpty()) {
                return httpResponse.response(HttpStatus.OK, DATA_IS_EMPTY, categoryCollections);
            }
            return httpResponse.response(HttpStatus.OK, SUCCESSFULLY, categoryCollections);
        } catch (Exception e) {
            throw new PostException(SOMETHING_WENT_WRONG);
        }
    }

    @GetMapping("/sort")
    public ResponseEntity<HttpResponse> findAllAfterSort() throws PostException {
        try {
            List<Post> categoryCollections = postService.findAllAfterSort();
            if (categoryCollections.isEmpty()) {
                return httpResponse.response(HttpStatus.OK, DATA_IS_EMPTY, categoryCollections);
            }
            return httpResponse.response(HttpStatus.OK, SUCCESSFULLY, categoryCollections);
        } catch (Exception e) {
            throw new PostException(SOMETHING_WENT_WRONG);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<HttpResponse> findById(@PathVariable UUID id) throws PostException {
        try {
            Optional<Post> categoryId = postService.findById(id);
            if (categoryId.isPresent()) {
                return httpResponse.response(HttpStatus.OK, SUCCESSFULLY, categoryId);
            }
            return httpResponse.response(HttpStatus.OK, POST_ID_IS_NOT_EXIST, categoryId);
        } catch (Exception e) {
            throw new PostException(SOMETHING_WENT_WRONG);
        }
    }

    @PostMapping
    public ResponseEntity<HttpResponse> save(@Valid @RequestBody PostDTO postDTO, @AuthenticationPrincipal UserDetails currentUser) throws PostException {
        Post postMapper = mapper.map(postDTO, Post.class);
        User user = (User) userRepository.findUserByUsername(currentUser.getUsername());
        postMapper.setUser(user);
        Post posts = postService.save(postMapper);
        try {
            Post postSaved = postService.save(posts);
            return httpResponse.response(HttpStatus.OK, CREATED, postSaved);
        } catch (Exception e) {
            throw new PostException(SOMETHING_WENT_WRONG);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<HttpResponse> updated(@PathVariable(value = "id") UUID id, @RequestBody PostDTO postDTO) throws PostException {
        try {
            PostUpdateDTO updated = postService.update(id, postDTO);
            return httpResponse.response(HttpStatus.OK, UPDATED, updated);
        } catch (Exception e) {
            throw new PostException(SOMETHING_WENT_WRONG);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpResponse> delete(@PathVariable UUID id) throws PostException {
        try {
            String deleted = postService.delete(id);
            return httpResponse.response(HttpStatus.OK, DELETED, deleted);
        } catch (Exception e) {
            throw new PostException(SOMETHING_WENT_WRONG);
        }
    }

    //    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/category/{id}")
    public ResponseEntity<HttpResponse> findByCategory(@PathVariable UUID id) throws PostException {
        try {
            List<Post> categoryId = postService.findPostByCategoryId(id);
            if (categoryId.isEmpty()) {
                return httpResponse.response(HttpStatus.OK, DATA_IS_EMPTY, categoryId);
            }
            return httpResponse.response(HttpStatus.OK, SUCCESSFULLY, categoryId);
        } catch (Exception e) {
            throw new PostException(SOMETHING_WENT_WRONG);
        }
    }

    @GetMapping("/category/sort/{id}")
    public ResponseEntity<HttpResponse> findAndSortPostByCategoryId(@PathVariable UUID id) throws PostException {
        try {
            List<Post> categoryId = postService.findAndSortPostByCategoryId(id);
            if (categoryId.isEmpty()) {
                return httpResponse.response(HttpStatus.OK, DATA_IS_EMPTY, categoryId);
            }
            return httpResponse.response(HttpStatus.OK, SUCCESSFULLY, categoryId);
        } catch (Exception e) {
            throw new PostException(SOMETHING_WENT_WRONG);
        }
    }

    @PostMapping("/search/title")
    public ResponseEntity<HttpResponse> findByTitle(@RequestBody SearchDTO search) throws PostException {
        try {
            List<Post> collections = postService.findByTitle(search.getKeyword());
            if (search.getKeyword().isEmpty()) {
                return httpResponse.response(HttpStatus.OK, MUST_BE_NOT_NULL, null);
            }
            return httpResponse.response(HttpStatus.OK, SUCCESSFULLY, collections);
        } catch (Exception e) {
            throw new PostException(SOMETHING_WENT_WRONG);
        }
    }

    @PostMapping("/search/{size}/{page}/{sort}")
    public ResponseEntity<Iterable<Post>> findByTitleWithPagination(@RequestBody SearchDTO search, @PathVariable int size, @PathVariable int page, @PathVariable String sort) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id"));
        if (sort.equalsIgnoreCase("desc")) {
            pageable = PageRequest.of(page, size, Sort.by("id").descending());
        } else if (sort.equalsIgnoreCase("asc")) {
            pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        }
        Iterable<Post> posts = postService.findByTitleContains(search.getKeyword(), pageable);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<HttpResponse> findByUserId(@PathVariable UUID id) throws PostException {
        try {
            List<Post> userId = postService.findPostByUserId(id);
            if (userId.isEmpty()) {
                return httpResponse.response(HttpStatus.OK, DATA_IS_EMPTY, userId);
            }
            return httpResponse.response(HttpStatus.OK, SUCCESSFULLY, userId);
        } catch (Exception e) {
            throw new PostException(SOMETHING_WENT_WRONG);
        }
    }

}
