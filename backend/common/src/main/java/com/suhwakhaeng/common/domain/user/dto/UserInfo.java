package com.suhwakhaeng.common.domain.user.dto;

import lombok.Builder;

@Builder
public record UserInfo(
        Long userId,
        String role
) {
}
