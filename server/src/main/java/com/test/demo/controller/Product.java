package com.test.demo.controller;

import com.test.demo.Service.ProductService;
import com.test.demo.dto.ProductDataDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
public class Product {
    @Autowired
    private ProductService productService;

    @PostMapping("/add")
    @Transactional
    public ResponseEntity postProduct(@Valid @RequestBody ProductDataDTO data){
        productService.createNewProduct(data);
        return ResponseEntity.ok().build();
    }

}
