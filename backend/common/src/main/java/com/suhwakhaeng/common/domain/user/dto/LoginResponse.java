package com.suhwakhaeng.common.domain.user.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record LoginResponse(Token token, UserInfo userInfo) {

    @Builder
    public record Token(String accessToken, String refreshToken) {}

    @Builder
    public record UserInfo(Long userId, String nickname, String email, String profileImage) {}

}
