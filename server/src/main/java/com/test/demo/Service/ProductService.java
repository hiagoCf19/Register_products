package com.test.demo.Service;
import com.test.demo.dto.ProductDataDTO;
import com.test.demo.dto.ProductSoldAmountDTO;
import com.test.demo.dto.UpdateProductDTO;
import com.test.demo.exception.ProductNotFoundException;
import com.test.demo.exception.ProductSoldOutException;
import com.test.demo.model.Products;
import com.test.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;



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
    public List<Products> getAllProducts (){
        return productRepository.findAll();
    }

    public Products getProductById(Long id){
        return productRepository.findById(id).orElseThrow(()-> new ProductNotFoundException("Ops! O produto que você está buscando não existe."));
    }
    public void deleteProduct(Long id){
        var product= getProductById(id);
        productRepository.delete(product);
    }
    public void updateDetails(UpdateProductDTO data){
        var product= getProductById(data.id());
        if(data.name() != null){
            product.setName(data.name());
        }
        if(data.description() != null){
            product.setDescription(data.description());
        }
        if(data.price() != null){
            product.setPrice(data.price());
        }
        if(data.discount() != null){
            product.setDiscount(data.discount());
        }
        if(data.quantity_in_stock() != null){
            product.setQuantityInStock(data.quantity_in_stock());
        }
    }

    public void productSoldAmount(ProductSoldAmountDTO data) {
        var product= getProductById(data.id());
        if(product.getQuantityInStock() <= 0 ){
            throw new ProductSoldOutException("Ops! Este produto se encontra esgotado no momento.");
        }
        Integer newAmount= product.getQuantityInStock() - data.amount();
        product.setQuantityInStock(newAmount);

    }
}
