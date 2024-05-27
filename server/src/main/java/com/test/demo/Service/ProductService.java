package com.test.demo.Service;

import com.test.demo.dto.ProductDataDTO;
import com.test.demo.model.Products;
import com.test.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Products createNewProduct(ProductDataDTO data){
        Products product= new Products();
        product.setName(data.name());
        product.setDescription(data.description());
        product.setPrice(data.price());
        product.setDiscount(data.discount());
        product.setQuantityInStock(data.quantity_in_stock());

        productRepository.save(product);
        return product;
    }
}
