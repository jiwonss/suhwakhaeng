package com.suhwakhaeng.common.domain.fcm.dto;

import lombok.Builder;

@Builder
public record FcmSubscribeRequest(
        String token,
        String topic
) { }
