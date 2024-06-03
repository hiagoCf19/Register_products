package com.test.demo.controller;

import com.test.demo.Service.ProductService;
import com.test.demo.dto.ProductDataDTO;
import com.test.demo.dto.ProductSoldAmountDTO;
import com.test.demo.dto.ProductsList;
import com.test.demo.dto.UpdateProductDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/products")
public class Product {
    @Autowired
    private ProductService productService;

    @PostMapping("/add")
    @Transactional
    public ResponseEntity postProduct(@Valid @RequestBody ProductDataDTO data, UriComponentsBuilder uriComponentsBuilder){
        var product= productService.createNewProduct(data);
        var uri= uriComponentsBuilder.path("/products/{id}").buildAndExpand(product.getId()).toUri();
        return ResponseEntity.created(uri).body(new ProductDataDTO(product.getId(), product.getName(), product.getDescription(), product.getPrice(), product.getDiscount(), product.getQuantityInStock()));
    }
    @GetMapping("/{id}")
    public ResponseEntity getProductById(@PathVariable Long id){
        var product= productService.getProductById(id);
        return ResponseEntity.ok().body(product);
    }
    @GetMapping
    public ResponseEntity getProducts(){
        var products= productService.getAllProducts();
        var list= products.stream().map((p)-> new ProductDataDTO(
                p.getId(),
                p.getName(),
                p.getDescription(),
                p.getPrice(),
                p.getDiscount(),
                p.getQuantityInStock()
        )).collect(Collectors.toList());
        return ResponseEntity.ok().body(new ProductsList(list));
    }
    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/edit")
    @Transactional
    public ResponseEntity putProductDetails(@RequestBody @Valid UpdateProductDTO data){
        productService.updateDetails(data);
        return ResponseEntity.noContent().build();
    }
    @PatchMapping("/sold")
    @Transactional
    public ResponseEntity soldProduct(@RequestBody @Valid ProductSoldAmountDTO data){
        productService.productSoldAmount(data);
        return ResponseEntity.noContent().build();
    }

}
