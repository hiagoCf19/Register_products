package com.test.demo.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProductSoldAmountDTO (
        @NotNull
        Long id,
        @Min(value = 1, message="O valor deve ser maior que zero")
        @NotNull
        Integer amount
) {
}
