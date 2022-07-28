package com.labs.doublepivot.utils;

import com.labs.doublepivot.exceptions.CategoryException;
import com.labs.doublepivot.exceptions.PostException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@RestControllerAdvice
public class ExceptionHandling {

    @Autowired
    private final HttpResponse HttpResponse;

    public ExceptionHandling(HttpResponse httpResponse) {
        HttpResponse = httpResponse;
    }

    @ExceptionHandler(CategoryException.class)
    public ResponseEntity<HttpResponse> categoryException(CategoryException exception) {
        return HttpResponse.response(BAD_REQUEST, exception.getMessage(), null);
    }

    @ExceptionHandler(PostException.class)
    public ResponseEntity<HttpResponse> postException(PostException exception) {
        return HttpResponse.response(BAD_REQUEST, exception.getMessage(), null);
    }

}
