package com.test.demo.dto;

import java.math.BigDecimal;

public record ProductDataDTO(Long id, String name, String description, BigDecimal price, BigDecimal discount, int quantity_in_stock) {
}
