package com.test.demo.exception;

public class ProductSoldOutException extends RuntimeException{
    public ProductSoldOutException (String messagae){
        super(messagae);
    }
}
