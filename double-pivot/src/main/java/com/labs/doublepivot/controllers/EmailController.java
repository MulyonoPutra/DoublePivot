package com.labs.doublepivot.controllers;

import com.labs.doublepivot.domain.dto.ChangePasswordDTO;
import com.labs.doublepivot.domain.dto.EmailValuesDTO;
import com.labs.doublepivot.domain.entities.User;
import com.labs.doublepivot.exceptions.PostException;
import com.labs.doublepivot.exceptions.UserException;
import com.labs.doublepivot.services.EmailService;
import com.labs.doublepivot.services.UserService;
import com.labs.doublepivot.utils.MessagesResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;
import java.util.UUID;

import static com.labs.doublepivot.constants.AuthConstant.*;
import static com.labs.doublepivot.constants.Constants.SOMETHING_WENT_WRONG;

@RestController
@RequestMapping("/v1/auth")
@CrossOrigin
public class EmailController {

    private final EmailService emailService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Value("${spring.mail.username}")
    private String mailFrom;

    private static final String subject = "Change of Password";

    public EmailController(EmailService emailService, UserService userService, PasswordEncoder passwordEncoder, MessagesResponse messages) {
        this.emailService = emailService;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/send-email")
    public ResponseEntity<MessagesResponse> sendEmailTemplate(@RequestBody EmailValuesDTO emailDTO) throws UserException {
        Optional<User> userOpt = userService.findByUsernameOrEmail(emailDTO.getMailTo());
        UUID uuid = UUID.randomUUID();

        try {
            if(userOpt.isEmpty()) {
                return MessagesResponse.response(HttpStatus.NOT_FOUND, THERE_IS_NO_USER_CREDENTIALS);
            }
            User user = userOpt.get();
            emailDTO.setMailFrom(mailFrom);
            emailDTO.setMailTo(user.getEmail());
            emailDTO.setSubject(subject);
            emailDTO.setUserName(user.getUsername());

            String tokenPassword = uuid.toString();
            emailDTO.setTokenPassword(tokenPassword);
            user.setTokenPassword(tokenPassword);
            userService.save(user);
            emailService.sendEmail(emailDTO);
            return MessagesResponse.response(HttpStatus.OK, EMAIL_SENT);
        } catch (Exception e) {
            throw new UserException(SOMETHING_WENT_WRONG);
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<MessagesResponse> changePassword(@Valid @RequestBody ChangePasswordDTO dto, BindingResult bindingResult) throws UserException {
        try {
            if(bindingResult.hasErrors()) {
                return MessagesResponse.response(HttpStatus.BAD_REQUEST, POORLY_LAID_FIELDS);
            }

            if(!dto.getPassword().equals(dto.getConfirmPassword())){
                return MessagesResponse.response(HttpStatus.BAD_REQUEST, PASSWORD_DO_NOT_MATCH);
            }

            Optional<User> optionalUser = userService.findByTokenPassword(dto.getTokenPassword());

            if(optionalUser.isEmpty()){
                return MessagesResponse.response(HttpStatus.NOT_FOUND, THERE_IS_NO_USER_CREDENTIALS);
            }

            User user = optionalUser.get();
            String newPassword = passwordEncoder.encode(dto.getPassword());
            user.setPassword(newPassword);
            user.setTokenPassword(null);
            userService.save(user);
            return MessagesResponse.response(HttpStatus.OK, UPDATED_PASSWORD);
        } catch (Exception e) {
            throw new UserException(SOMETHING_WENT_WRONG);
        }


    }
}
