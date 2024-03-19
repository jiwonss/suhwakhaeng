package com.suhwakhaeng.common.domain.user.dto;

import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.domain.user.enums.Role;
import com.suhwakhaeng.common.global.common.entity.Location;

public record ProfileRequest(
        String profileImage,
        String nickname,
        String role,
        String profileContent,
        String sido,
        String gugun,
        String dong,
        String roadNameAddress) {

    public User toEntity() {
        return User.builder()
                .profileImage(profileImage)
                .nickname(nickname)
                .role(Role.findRole(role))    // Role enum에 메서드 추가
                .profileContent(profileContent)
                .location(Location.builder()
                        .sido(sido)
                        .gugun(gugun)
                        .dong(dong)
                        .roadNameAddress(roadNameAddress)
                        .build())
                .build();
    }

}
