package com.suhwakhaeng.common.domain.user.service.impl;

import com.suhwakhaeng.common.domain.fcm.service.FcmService;
import com.suhwakhaeng.common.domain.user.dto.*;
import com.suhwakhaeng.common.domain.user.entity.RefreshToken;
import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.domain.user.enums.Status;
import com.suhwakhaeng.common.domain.user.exception.UserErrorCode;
import com.suhwakhaeng.common.domain.user.exception.UserException;
import com.suhwakhaeng.common.domain.user.repository.RefreshTokenRepository;
import com.suhwakhaeng.common.domain.user.repository.UserRepository;
import com.suhwakhaeng.common.domain.user.service.OauthService;
import com.suhwakhaeng.common.global.common.dto.UserInfo;
import com.suhwakhaeng.common.global.component.jwt.JwtProps;
import com.suhwakhaeng.common.global.component.jwt.JwtProvider;
import com.suhwakhaeng.common.global.component.jwt.exception.JwtException;
import com.suhwakhaeng.common.global.component.oauth.OauthMemberClientComposite;
import com.suhwakhaeng.common.global.component.oauth.vendor.enums.OauthServerType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.suhwakhaeng.common.global.component.jwt.exception.JwtErrorCode.INVALID_TOKEN;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class OauthServiceImpl implements OauthService {
    private final OauthMemberClientComposite oauthMemberClientComposite;
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtProvider jwtProvider;
    private final FcmService fcmService;
    private final JwtProps jwtProps;

    @Override
    public LoginResponse login(OauthServerType oauthServerType, OauthTokenRequest request) {
        User oauthUser = oauthMemberClientComposite.fetch(oauthServerType, request.oauthToken());

        User user = userRepository.findByEmail(oauthUser.getEmail())
                .orElseGet(
                        () -> userRepository.save(oauthUser)
                );

        if (Status.RUN != user.getStatus()) {
            user.rejoin();
        }

        String accessToken = jwtProvider.issueAccessToken(user.getId(), user.getRole().name());
        String refreshToken = jwtProvider.issueRefreshToken();

        refreshTokenRepository.save(RefreshToken.createRefreshToken(refreshToken, user, jwtProps.accessExpiration()));

        fcmService.createDeviceToken(user.getId(), request.deviceToken());

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

        RefreshToken storedRefreshToken = refreshTokenRepository.findById(refreshToken)
                .orElseThrow(() -> new JwtException(INVALID_TOKEN));

        User user = userRepository.findById(userInfo.getUserId())
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_EXIST_USER));

        String newAccessToken = jwtProvider.issueAccessToken(user.getId(), user.getRole().name());
        String newRefreshToken = jwtProvider.issueRefreshToken();

        refreshTokenRepository.delete(storedRefreshToken);

        refreshTokenRepository.save(RefreshToken.createRefreshToken(newRefreshToken, user, jwtProps.accessExpiration()));

        return TokenInfo.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();
    }
}
