package com.labs.doublepivot.services.serviceImpl;

import com.labs.doublepivot.domain.dto.UserUpdateDTO;
import com.labs.doublepivot.domain.entities.User;
import com.labs.doublepivot.exceptions.UserException;
import com.labs.doublepivot.repositories.UserRepository;
import com.labs.doublepivot.services.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.labs.doublepivot.constants.ConfigConstant.TEMP_PROFILE_IMAGE_BASE_URL;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public void save(User user) {
        user.setProfilePicture(getTemporaryProfileImageUrl(user.getUsername()));
        userRepository.save(user);
    }

    private String getTemporaryProfileImageUrl(String username) {
        return TEMP_PROFILE_IMAGE_BASE_URL + username;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(UUID id) throws UserException {
        return userRepository.findById(id);
    }

    @Override
    public void delete(UUID id) {
        userRepository.deleteById(id);
    }

    @Override
    public User update(UUID id, UserUpdateDTO userUpdate) throws UserException {
        if (userRepository.findById(id).isPresent()) {
            User userId = userRepository.findById(id).get();
            userId.setName(userUpdate.getName());
            userId.setUsername(userUpdate.getUsername());
            userId.setEmail(userUpdate.getEmail());
            userId.setProfilePicture(userUpdate.getProfilePicture());

            User updated = userRepository.save(userId);
            return new User(updated.getName(), updated.getUsername(), updated.getEmail(), updated.getProfilePicture());
        } else {
            return null;
        }
    }

    @Override
    public Optional<User> findByUsernameOrEmail(String nameOrEmail) throws UserException {
        return userRepository.findByUsernameOrEmail(nameOrEmail, nameOrEmail);
    }

    @Override
    public Optional<User> findByTokenPassword(String tokenPassword) throws UserException {
        return userRepository.findByTokenPassword(tokenPassword);
    }

    @Override
    public Optional<User> findUserById(UUID id) throws UserException {
        return userRepository.findById(id);
    }

}
