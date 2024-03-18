package com.suhwakhaeng.common.domain.user.dto;

import lombok.Builder;

@Builder
public record Token(String accessToken, String refreshToken) {
}
