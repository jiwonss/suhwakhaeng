package com.suhwakhaeng.common.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
public class LoginResponse {
    private TokenInfo tokenInfo;
    private UserDetailInfo userDetailInfo;
}
