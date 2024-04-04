package com.suhwakhaeng.common.domain.user.dto;

import lombok.Builder;

@Builder
public record OauthTokenRequest(String oauthToken, String deviceToken) {
}
