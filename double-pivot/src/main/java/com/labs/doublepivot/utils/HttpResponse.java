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
public class HttpResponse {

    private HttpStatus httpStatus;
    private String message;
    private Object data;

    public static ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message, Object data) {
        return new ResponseEntity<>(new HttpResponse(httpStatus, message, data), httpStatus);
    }

}
