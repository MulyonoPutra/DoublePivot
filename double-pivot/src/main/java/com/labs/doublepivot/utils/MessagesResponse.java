package com.labs.doublepivot.utils;

import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class MessagesResponse {

    private HttpStatus httpStatus;
    private String message;

    public static ResponseEntity<MessagesResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(new MessagesResponse(httpStatus, message), httpStatus);
    }
}
