package com.suhwakhaeng.common.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class TokenInfo {
    private String accessToken;
    private String refreshToken;
}
