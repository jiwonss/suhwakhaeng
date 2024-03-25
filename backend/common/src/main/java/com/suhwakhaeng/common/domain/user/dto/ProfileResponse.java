package com.suhwakhaeng.common.domain.user.dto;

import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.domain.user.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponse {
    private Long userId;
    private String nickname;
    private String profileImage;
    private Boolean isBusiness;
    private String profileContent;
    private String role;

    private String sido;
    private String gugun;
    private String dong;

    // location null 여부에 따라 반환값이 달라진다.
    public static ProfileResponse fromUser(User user) {
        return ProfileResponse.builder()
                .userId(user.getId())
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .profileContent(user.getProfileContent())
                .role(user.getRole().getName())
                .sido(user.getLocation() == null ? null : user.getLocation().getSido())
                .gugun(user.getLocation() == null ? null : user.getLocation().getGugun())
                .dong(user.getLocation() == null ? null : user.getLocation().getDong())
                .isBusiness(user.getRole() == Role.BUISNESS)
                .build();
    }
}
