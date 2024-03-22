package com.suhwakhaeng.chat.dto;

public record ChatRequest(
        Long userId,
        String messaage
) { }