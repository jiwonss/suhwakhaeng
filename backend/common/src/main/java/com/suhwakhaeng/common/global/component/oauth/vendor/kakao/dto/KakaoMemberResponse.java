package com.suhwakhaeng.common.global.component.oauth.vendor.kakao.dto;

import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.suhwakhaeng.common.domain.user.entity.OauthId;
import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.domain.user.enums.Role;

import java.time.LocalDateTime;

import static com.fasterxml.jackson.databind.PropertyNamingStrategies.*;
import static com.suhwakhaeng.common.global.component.oauth.vendor.enums.OauthServerType.KAKAO;

@JsonNaming(SnakeCaseStrategy.class)
public record KakaoMemberResponse(
        Long id,
        boolean hasSignedUp,
        LocalDateTime connectedAt,
        KakaoAccount kakaoAccount
) {

    public User toEntity() {
        return User.builder()
                .email(kakaoAccount.email())
                .nickname(kakaoAccount.profile().nickname())
                .profileImage(kakaoAccount.profile.profileImageUrl())
                .role(Role.USER)
                .oauthId(new OauthId(String.valueOf(id), KAKAO))
                .build();
    }

    @JsonNaming(SnakeCaseStrategy.class)
    public record KakaoAccount(
            boolean profileNeedsAgreement,
            boolean profileNicknameNeedsAgreement,
            boolean profileImageNeedsAgreement,
            Profile profile,
            boolean nameNeedsAgreement,
            String name,
            boolean emailNeedsAgreement,
            boolean isEmailValid,
            boolean isEmailVerified,
            String email,
            boolean ageRangeNeedsAgreement,
            String ageRange,
            boolean birthyearNeedsAgreement,
            String birthyear,
            boolean birthdayNeedsAgreement,
            String birthday,
            String birthdayType,
            boolean genderNeedsAgreement,
            String gender,
            boolean phoneNumberNeedsAgreement,
            String phoneNumber,
            boolean ciNeedsAgreement,
            String ci,
            LocalDateTime ciAuthenticatedAt
    ) {
    }

    @JsonNaming(SnakeCaseStrategy.class)
    public record Profile(
            String nickname,
            String thumbnailImageUrl,
            String profileImageUrl,
            boolean isDefaultImage
    ) {
    }
}
