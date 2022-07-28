package com.labs.doublepivot.domain.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class CategoryUpdateDTO {

    private UUID id;
    private String name;

}
