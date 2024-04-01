package com.suhwakhaeng.common.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BusinessResponse {
    private Long userId;
    private String nickname;
    private Long businessId;
    private String image;
    private Boolean isAccepted;
}
