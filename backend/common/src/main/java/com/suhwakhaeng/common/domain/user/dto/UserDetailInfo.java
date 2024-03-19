package com.suhwakhaeng.common.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class UserDetailInfo {
    private Long userId;
    private String nickname;
    private String email;
    private String profileImage;
}
