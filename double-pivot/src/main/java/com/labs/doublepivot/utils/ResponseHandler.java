package com.labs.doublepivot.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

// Unused Class temporary not deleted cause will be used in the future
public class ResponseHandler {

    public static ResponseEntity<Object> generateResponse(String messages, HttpStatus status, Object data) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("messages", messages);
        map.put("status", status.value());
        map.put("data", data);

        return new ResponseEntity<Object>(map, status);
    }

}
