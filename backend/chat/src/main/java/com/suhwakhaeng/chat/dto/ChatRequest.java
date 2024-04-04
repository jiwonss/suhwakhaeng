package com.suhwakhaeng.chat.dto;

// userId는 상대방 userId
public record ChatRequest(
        String message
) { }