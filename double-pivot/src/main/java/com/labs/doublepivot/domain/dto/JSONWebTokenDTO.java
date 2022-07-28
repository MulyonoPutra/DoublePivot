package com.labs.doublepivot.domain.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Getter
@Setter
public class JSONWebTokenDTO {
    private String bearer = "Bearer";
    private String token;
    private String username;
    private Collection<? extends GrantedAuthority> authorities;

    public JSONWebTokenDTO(String token, String username, Collection<? extends GrantedAuthority> authorities) {
        this.token = token;
        this.username = username;
        this.authorities = authorities;
    }
}
