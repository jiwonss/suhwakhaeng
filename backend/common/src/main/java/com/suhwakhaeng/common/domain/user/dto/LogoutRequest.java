package com.suhwakhaeng.common.domain.user.dto;

public record LogoutRequest(String refreshToken, String deviceToken) {
}
