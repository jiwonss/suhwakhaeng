package com.suhwakhaeng.common.domain.user.dto;

import com.suhwakhaeng.common.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResponse {
    private Long userId;
    private String nickname;
    private String profileImage;
    private String sido;
    private String gugun;

    public static UserInfoResponse fromUser(User user) {
        return UserInfoResponse.builder()
                .userId(user.getId())
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .sido(user.getLocation() == null ? null : user.getLocation().getSido())
                .gugun(user.getLocation() == null ? null : user.getLocation().getGugun())
                .build();
    }
}
