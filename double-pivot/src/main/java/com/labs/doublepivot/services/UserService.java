package com.labs.doublepivot.services;

import com.labs.doublepivot.domain.dto.UserUpdateDTO;
import com.labs.doublepivot.domain.entities.User;
import com.labs.doublepivot.exceptions.UserException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserService {

    public Optional<User> findByUsername(String username);

    public boolean existsByUsername(String username);

    public boolean existsByEmail(String email);

    public void save(User user);

    public List<User> findAll();

    public Optional<User> findById(UUID id) throws UserException;

    public void delete(UUID id) throws UserException;

    public User update(UUID id, UserUpdateDTO userUpdate) throws UserException;

    public Optional<User> findByUsernameOrEmail(String nameOrEmail) throws UserException;

    public Optional<User> findByTokenPassword(String tokenPassword) throws UserException;

    public Optional<User> findUserById(UUID id) throws UserException;

}
