package com.test.demo.dto;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record UpdateProductDTO(
        @NotNull
        Long id,
        String name,
        String description,
        BigDecimal price,
        BigDecimal discount,
        Integer quantity_in_stock
) { }
