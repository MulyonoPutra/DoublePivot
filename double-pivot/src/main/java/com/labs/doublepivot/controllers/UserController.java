package com.labs.doublepivot.controllers;

import com.labs.doublepivot.domain.dto.CurrentUserDTO;
import com.labs.doublepivot.domain.dto.UserUpdateDTO;
import com.labs.doublepivot.domain.entities.User;
import com.labs.doublepivot.exceptions.UserException;
import com.labs.doublepivot.repositories.UserRepository;
import com.labs.doublepivot.services.UserService;
import com.labs.doublepivot.utils.HttpResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.labs.doublepivot.constants.Constants.*;

@SuppressWarnings("ALL")
@RestController
@RequestMapping("v1/user")
public class UserController {

    private final UserService userService;
    private final HttpResponse httpResponse;
    private final UserRepository userRepository;

    public UserController(UserService userService, HttpResponse httpResponse, UserRepository userRepository) {
        this.userService = userService;
        this.httpResponse = httpResponse;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<HttpResponse> findAll() {
        try {
            List<User> users = userService.findAll();
            return httpResponse.response(HttpStatus.OK, SUCCESSFULLY, users);
        } catch (Exception e) {
            return httpResponse.response(HttpStatus.OK, SUCCESSFULLY, null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<HttpResponse> findById(@PathVariable UUID id) throws UserException {
        try {
            Optional<User> user = userService.findById(id);
            return httpResponse.response(HttpStatus.OK, SUCCESSFULLY, user);
        } catch (Exception e) {
            throw new UserException(SOMETHING_WENT_WRONG);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<HttpResponse> update(@PathVariable UUID id, @RequestBody UserUpdateDTO userUpdate) throws UserException {
        try {
            userService.update(id, userUpdate);
            List<User> userCollections = userService.findAll();
            return HttpResponse.response(HttpStatus.OK, UPDATED, userCollections);
        } catch (UserException e) {
            throw new UserException(USER_ID_IS_NOT_EXIST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpResponse> delete(@PathVariable UUID id) throws UserException {
        try {
            userService.delete(id);
            List<User> userCollections = userService.findAll();
            return HttpResponse.response(HttpStatus.OK, DELETED, userCollections);
        } catch (UserException e) {
            throw new UserException(CATEGORY_ID_IS_NOT_EXIST);
        }
    }

    @GetMapping("/register/{id}")
    public ResponseEntity<HttpResponse> findUserById(@PathVariable UUID id) throws UserException {
        try {
            Optional<User> user = userService.findUserById(id);
            return httpResponse.response(HttpStatus.OK, SUCCESSFULLY, user);
        } catch (Exception e) {
            throw new UserException(SOMETHING_WENT_WRONG);
        }
    }

    @GetMapping("/current-user")
    public ResponseEntity<CurrentUserDTO> currentUser(@AuthenticationPrincipal UserDetails currentUser) {
        User user = (User) userRepository.findUserByUsername(currentUser.getUsername());
        CurrentUserDTO currentUserDTO = new CurrentUserDTO(user.getId(), user.getName(), user.getUsername(), user.getEmail(), user.getProfilePicture());
        return new ResponseEntity(currentUserDTO, HttpStatus.OK);
    }

}
