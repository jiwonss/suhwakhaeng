package com.suhwakhaeng.chat.dto;

import lombok.Builder;

@Builder
public record UserInfo(
        Long userId,
        String nickname,
        String profileImage,
        String sido,
        String gugun
){}