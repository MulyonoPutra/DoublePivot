package com.labs.doublepivot.controllers;

import com.labs.doublepivot.domain.dto.JSONWebTokenDTO;
import com.labs.doublepivot.domain.dto.Login;
import com.labs.doublepivot.domain.dto.Register;
import com.labs.doublepivot.domain.entities.Role;
import com.labs.doublepivot.domain.entities.User;
import com.labs.doublepivot.domain.enums.RoleName;
import com.labs.doublepivot.exceptions.CategoryException;
import com.labs.doublepivot.security.jwt.JWTProvider;
import com.labs.doublepivot.services.RoleService;
import com.labs.doublepivot.services.UserService;
import com.labs.doublepivot.utils.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

import static com.labs.doublepivot.constants.Constants.*;

@SuppressWarnings("ALL")
@RestController
@RequestMapping("v1/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserService userService;
    @Autowired
    RoleService roleService;
    @Autowired
    JWTProvider jwtProvider;

    @PostMapping("/register")
    public ResponseEntity<HttpResponse> register(@Valid @RequestBody Register register, BindingResult result) {
        ResponseEntity validation = responseValidation(register, result);
        if (validation != null) return validation;
        User user = new User(
                register.getName(),
                register.getUsername(),
                register.getEmail(),
                passwordEncoder.encode(register.getPassword()),
                register.getProfilePicture());
        Set<Role> roles = new HashSet<>();
        roles.add(roleService.findByRoleName(RoleName.ROLE_USER).get());
        user.setRoles(roles);
        userService.save(user);
        return HttpResponse.response(HttpStatus.CREATED, REGISTERED, user);
    }

    @PostMapping("/admin-register")
    public ResponseEntity<HttpResponse> adminRegister(@Valid @RequestBody Register register, BindingResult result) throws CategoryException {
        ResponseEntity validation = responseValidation(register, result);
        if (validation != null) return validation;
        User user = new User(
                register.getName(),
                register.getUsername(),
                register.getEmail(),
                passwordEncoder.encode(register.getPassword()),
                register.getProfilePicture());
        Set<Role> roles = new HashSet<>();
        roles.add(roleService.findByRoleName(RoleName.ROLE_ADMIN).get());
        user.setRoles(roles);
        userService.save(user);
        return HttpResponse.response(HttpStatus.CREATED, REGISTERED, user);
    }

    private ResponseEntity responseValidation(Register register, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity(INVALID_REQUEST, HttpStatus.BAD_REQUEST);
        }
        if (userService.existsByUsername(register.getUsername())) {
            return new ResponseEntity(USERNAME_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
        }
        if (userService.existsByEmail(register.getEmail())) {
            return new ResponseEntity(EMAIL_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
        }
        return null;
    }

    @PostMapping("/login")
    public ResponseEntity<JSONWebTokenDTO> login(@Valid @RequestBody Login login, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity(INVALID_REQUEST, HttpStatus.BAD_REQUEST);
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        JSONWebTokenDTO jwtDTO = new JSONWebTokenDTO(token, userDetails.getUsername(), userDetails.getAuthorities());
        return new ResponseEntity(jwtDTO, HttpStatus.OK);
    }
}
