package com.suhwakhaeng.common.domain.user.service.impl;

import com.suhwakhaeng.common.domain.user.dto.*;
import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.domain.user.repository.UserRepository;
import com.suhwakhaeng.common.domain.user.service.OauthService;
import com.suhwakhaeng.common.global.common.dto.UserInfo;
import com.suhwakhaeng.common.global.component.jwt.JwtProvider;
import com.suhwakhaeng.common.global.component.jwt.repository.RefreshTokenRepository;
import com.suhwakhaeng.common.global.component.oauth.OauthMemberClientComposite;
import com.suhwakhaeng.common.global.component.oauth.vendor.enums.OauthServerType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class OauthServiceImpl implements OauthService {
    private final OauthMemberClientComposite oauthMemberClientComposite;
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtProvider jwtProvider;
    @Override
    public LoginResponse login(OauthServerType oauthServerType, String token) {
        User oauthUser = oauthMemberClientComposite.fetch(oauthServerType, token);

        User user = userRepository.findByEmail(oauthUser.getEmail())
                .orElseGet(
                        () -> userRepository.save(oauthUser)
                );

        String accessToken = jwtProvider.issueAccessToken(user.getId(), user.getRole().name());
        String refreshToken = jwtProvider.issueRefreshToken();

        refreshTokenRepository.save(String.valueOf(user.getId()), refreshToken);

        return LoginResponse.builder()
                .tokenInfo(
                        TokenInfo.builder()
                                .accessToken(accessToken)
                                .refreshToken(refreshToken).
                                build())
                .userDetailInfo(UserDetailInfo.builder()
                        .userId(user.getId())
                        .nickname(user.getNickname())
                        .profileImage(user.getProfileImage())
                        .build()
                ).build();
    }

    @Override
    public TokenInfo reissue(String accessToken, String refreshToken) {
        UserInfo userInfo = jwtProvider.parseAccessTokenByBase64(accessToken);
        String newAccessToken = jwtProvider.issueAccessToken(userInfo.getUserId(), userInfo.getRole());
        String newRefreshToken = jwtProvider.issueRefreshToken();

        refreshTokenRepository.save(String.valueOf(userInfo.getUserId()), newRefreshToken);

        return TokenInfo.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();
    }
}
