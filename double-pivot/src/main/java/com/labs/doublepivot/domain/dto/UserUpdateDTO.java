package com.labs.doublepivot.domain.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Lob;

@Getter
@Setter
public class UserUpdateDTO {

    private String name;
    private String username;
    private String email;

    @Lob
    private String profilePicture;

    public UserUpdateDTO() {
    }

    public UserUpdateDTO(String name, String username, String email, String profilePicture) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.profilePicture = profilePicture;
    }

}
