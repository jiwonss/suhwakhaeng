package com.suhwakhaeng.common.domain.user.dto;

import lombok.Builder;

@Builder
public record UserDetailInfo(Long userId, String nickname, String email, String profileImage) {
}
