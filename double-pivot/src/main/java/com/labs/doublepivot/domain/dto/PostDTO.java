package com.labs.doublepivot.domain.dto;

import com.labs.doublepivot.domain.entities.Category;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotEmpty;

@Data
public class PostDTO {

    @NotEmpty(message = "Title name is required")
    @Column(name = "title", nullable = false)
    private String title;

    @NotEmpty(message = "subtitle name is required")
    @Column(name = "subtitle", nullable = false)
    private String subtitle;

    @NotEmpty(message = "content name is required")
    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @NotEmpty(message = "author name is required")
    @Column(name = "author", nullable = false)
    private String author;

    @Lob
    @Column(name = "images", nullable = false)
    private String images;

    @ManyToOne
    private Category category;
}
