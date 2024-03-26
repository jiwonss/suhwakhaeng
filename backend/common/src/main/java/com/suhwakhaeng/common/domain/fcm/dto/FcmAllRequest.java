package com.suhwakhaeng.common.domain.fcm.dto;

import lombok.Builder;

@Builder
public record FcmAllRequest(
        String title,
        String body
) { }
