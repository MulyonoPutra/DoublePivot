package com.labs.doublepivot.domain.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class CurrentUserDTO {
    private UUID id;
    private String name;
    private String username;
    private String email;
    private String profilePicture;

    public CurrentUserDTO() {
    }

    public CurrentUserDTO(UUID id, String name, String username, String email, String profilePicture) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.profilePicture = profilePicture;
    }

}
