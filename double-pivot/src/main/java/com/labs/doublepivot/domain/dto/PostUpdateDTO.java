package com.labs.doublepivot.domain.dto;

import com.labs.doublepivot.domain.entities.Category;
import lombok.*;
import java.util.UUID;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class PostUpdateDTO {

    private UUID id;
    private String title;
    private String subtitle;
    private String content;
    private String author;
    private String images;
    private Category category;

}
