package com.suhwakhaeng.common.domain.fcm.dto;

import lombok.Builder;

@Builder
public record FcmTokenRequest(
        String title,
        String body,
        Long userId
) { }
