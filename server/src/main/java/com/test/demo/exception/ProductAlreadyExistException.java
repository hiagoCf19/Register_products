package com.test.demo.exception;

public class ProductAlreadyExistException extends RuntimeException{
    public ProductAlreadyExistException (String message){
        super(message);
    }
}
