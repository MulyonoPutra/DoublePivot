package com.labs.doublepivot.repositories;

import com.labs.doublepivot.domain.entities.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import javax.websocket.server.PathParam;
import java.util.List;
import java.util.UUID;

@SuppressWarnings("ALL")
@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {

    List<Post> findByAuthorContains(String author);

    @Query("SELECT p FROM Post p WHERE p.category.id LIKE :categoryId")
    List<Post> findPostByCategoryId(@PathParam("categoryId") UUID categoryId);

    @Query("SELECT p FROM Post p WHERE p.title LIKE :title")
    List<Post> findPostByTitle(@PathParam("title") String title);

    @Query("SELECT p FROM Post p WHERE p.author LIKE :author")
    List<Post> findPostByAuthor(@PathParam("author") String author);

    Page<Post> findByTitleContains(String title, Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.user.id LIKE :userId")
    List<Post> findPostByUserId(@PathParam("userId") UUID userId);

}
