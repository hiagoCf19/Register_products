package com.test.demo.config;

import com.test.demo.dto.ErrorBadRequestDTO;
import com.test.demo.dto.MessageErrorDTO;
import com.test.demo.exception.ProductNotFoundException;
import com.test.demo.exception.UserAlreadyExistException;
import com.test.demo.exception.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExeptionEntityHandler {
    @ExceptionHandler(UserAlreadyExistException.class)
    public ResponseEntity handleUserAlreadyExist(UserAlreadyExistException exception){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new MessageErrorDTO(exception.getMessage()));
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity handleNotFound(MethodArgumentNotValidException exception){
    var errors= exception.getFieldErrors();
        return ResponseEntity.badRequest().body(errors.stream().map(ErrorBadRequestDTO::new));
    }
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity handleUserNotFound(UserNotFoundException exception){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageErrorDTO(exception.getMessage()));
    }
    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity handleProductNotFound(ProductNotFoundException exception){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageErrorDTO(exception.getMessage()));
    }
}
