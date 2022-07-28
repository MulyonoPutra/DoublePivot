package com.labs.doublepivot.services;

import com.labs.doublepivot.domain.dto.PostDTO;
import com.labs.doublepivot.domain.dto.PostUpdateDTO;
import com.labs.doublepivot.domain.entities.Post;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PostService {
    Post save(Post post);

    PostUpdateDTO update(UUID id, PostDTO post);

    List<Post> findAll();

    List<Post> findAllAfterSort();

    Optional<Post> findById(UUID id);

    public String delete(UUID id);

    List<Post> findPostByCategoryId(UUID id);

    List<Post> findPostByUserId(UUID id);

    List<Post> findAndSortPostByCategoryId(UUID id);

    List<Post> findByAuthorName(String author);

    List<Post> findByTitle(String title);

    Iterable<Post> findByTitleContains(String title, Pageable pageable);
}
