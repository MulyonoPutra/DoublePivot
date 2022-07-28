package com.labs.doublepivot.domain.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;


@Getter
@Setter
@Entity
public class User {

    @Id
    @GeneratedValue()
    @Column(name = "id", updatable = false, nullable = false, unique = true, columnDefinition = "BINARY(16)")
    private UUID id;

    @NotNull
    private String name;

    @NotNull
    @Column(unique = true)
    private String username;

    @NotNull
    @Column(unique = true, nullable = false)
    private String email;

    @Size(min = 4, message = "Minimum password length: 8 characters")
    @NotNull
    private String password;
    private String tokenPassword;

    @Lob
    private String profilePicture;

    @NotNull
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();


    public User() {
    }

    public User(@NotNull String name, @NotNull String username, @NotNull String email, @NotNull String password, String profilePicture) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.profilePicture = profilePicture;
    }

    /**
     * Update User Constructor
     */
    public User(String name, String username, String email, String profilePicture) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.profilePicture = profilePicture;
    }
}
