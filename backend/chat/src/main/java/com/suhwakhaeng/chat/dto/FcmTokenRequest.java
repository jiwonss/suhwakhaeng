package com.suhwakhaeng.chat.dto;

import lombok.Builder;

@Builder
public record FcmTokenRequest(
        String title,
        String body,
        Long userId
) { }
