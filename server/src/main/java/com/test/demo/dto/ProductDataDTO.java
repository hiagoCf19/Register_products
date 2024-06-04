package com.test.demo.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


import java.math.BigDecimal;

public record ProductDataDTO(
        Long id,
        @NotNull
        @NotBlank
        String name,
        @NotNull
        @NotBlank
        String description,
        @NotNull
        BigDecimal price,
        @NotNull
        BigDecimal discount,
        @NotNull
        Integer quantity_in_stock
) {


}
