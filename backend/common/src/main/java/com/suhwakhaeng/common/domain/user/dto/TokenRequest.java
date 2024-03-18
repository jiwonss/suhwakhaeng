package com.suhwakhaeng.common.domain.user.dto;

import lombok.Builder;

@Builder
public record TokenRequest(String accessToken, String refreshToken) {
}
