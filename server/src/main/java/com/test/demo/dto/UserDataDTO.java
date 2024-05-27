package com.test.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserDataDTO(
        Long id,
        @NotNull
        @NotBlank
        String nome,
        @NotBlank
        @Email
        String email) {
}