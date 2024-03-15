package com.suhwakhaeng.common.domain.user.service.impl;

import com.suhwakhaeng.common.domain.user.dto.LoginResponse;
import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.domain.user.repository.UserRepository;
import com.suhwakhaeng.common.domain.user.service.OauthService;
import com.suhwakhaeng.common.global.component.jwt.repository.JwtProvider;
import com.suhwakhaeng.common.global.component.oauth.OauthMemberClientComposite;
import com.suhwakhaeng.common.global.component.oauth.vendor.enums.OauthServerType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class OauthServiceImpl implements OauthService {
    private final OauthMemberClientComposite oauthMemberClientComposite;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    @Override
    public LoginResponse login(OauthServerType oauthServerType, String token) {
        User user = oauthMemberClientComposite.fetch(oauthServerType, token);

        // 이메일을 통해 조회
        // 이미 존재하면 get
        // 존재하지 않으면 save

        Optional<User> findUser = userRepository.findByEmail(user.getEmail());

        // 이미 존재
        if (findUser.isPresent()) {
            user = findUser.get();
        } else {
            user = userRepository.save(user);
        }

        log.debug("user id : {}", user.getId());

        String accessToken = jwtProvider.issueAccessToken(user.getId(), user.getRole().name());
        String refreshToken = jwtProvider.issueRefreshToken();

        return LoginResponse.builder()
                .token(
                        LoginResponse.Token.builder()
                                .accessToken(accessToken)
                                .refreshToken(refreshToken).
                                build())
                .userInfo(LoginResponse.UserInfo.builder()
                        .userId(user.getId())
                        .nickname(user.getNickname())
                        .email(user.getEmail())
                        .profileImage(user.getProfileImage())
                        .build()
                ).build();
    }
}
