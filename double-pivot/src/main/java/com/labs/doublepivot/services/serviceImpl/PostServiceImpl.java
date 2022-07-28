package com.labs.doublepivot.services.serviceImpl;

import com.labs.doublepivot.domain.dto.PostDTO;
import com.labs.doublepivot.domain.dto.PostUpdateDTO;
import com.labs.doublepivot.domain.entities.Post;
import com.labs.doublepivot.repositories.PostRepository;
import com.labs.doublepivot.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Override
    public Post save(Post post) {
        return postRepository.save(post);
    }

    @Override
    public PostUpdateDTO update(UUID id, PostDTO post) {
        if (postRepository.findById(id).isPresent()) {
            Post postId = postRepository.findById(id).get();
            postId.setTitle(post.getTitle());
            postId.setSubtitle(post.getSubtitle());
            postId.setContent(post.getContent());
            postId.setAuthor(post.getAuthor());
            postId.setImages(post.getImages());
            postId.setCategory(post.getCategory());

            Post updated = postRepository.save(postId);
            return new PostUpdateDTO(
                    updated.getId(),
                    updated.getTitle(),
                    updated.getSubtitle(),
                    updated.getContent(),
                    updated.getAuthor(),
                    updated.getImages(),
                    updated.getCategory());

        } else {
            return null;
        }
    }


    @Override
    public List<Post> findAll() {
        return postRepository.findAll();
    }

    @Override
    public List<Post> findAllAfterSort() {
        List<Post> post = new ArrayList<>();
        List<Post> postCollections = postRepository.findAll();
        for (int i = 0; i < postCollections.size(); i++) {
            if (i == 2) {
                break;
            }
            post.add(postCollections.get(i));
        }

        return post;
    }

    @Override
    public Optional<Post> findById(UUID id) {
        return postRepository.findById(id);
    }

    @Override
    public String delete(UUID id) {
        postRepository.deleteById(id);
        return null;
    }

    @Override
    public List<Post> findPostByCategoryId(UUID id) {
        return postRepository.findPostByCategoryId(id);
    }

    @Override
    public List<Post> findPostByUserId(UUID id) {
        return postRepository.findPostByUserId(id);
    }

    @Override
    public List<Post> findAndSortPostByCategoryId(UUID id) {
        List<Post> postCollections = new ArrayList<>();
        List<Post> postByCategoryId = postRepository.findPostByCategoryId(id);
        for (int i = 0; i < postByCategoryId.size(); i++) {
            if (i == 4) {
                break;
            }
            postCollections.add(postByCategoryId.get(i));
        }
        return postCollections;
    }

    @Override
    public List<Post> findByAuthorName(String author) {
        return postRepository.findByAuthorContains(author);
    }

    @Override
    public List<Post> findByTitle(String title) {
        return postRepository.findPostByTitle("%" + title + "%");
    }

    @Override
    public Iterable<Post> findByTitleContains(String title, Pageable pageable) {
        return postRepository.findByTitleContains(title, pageable);
    }

}
