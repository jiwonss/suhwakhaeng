package com.suhwakhaeng.common.global.component.oauth.vendor.kakao.client;

import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.global.component.oauth.OauthMemberClient;
import com.suhwakhaeng.common.global.component.oauth.vendor.enums.OauthServerType;
import com.suhwakhaeng.common.global.component.oauth.vendor.kakao.dto.KakaoMemberResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KakaoMemberClient implements OauthMemberClient {
    private final KakaoApiClient kakaoApiClient;
//    private final KakaoOauthConfig kakaoOauthConfig;

    @Override
    public OauthServerType supportServer() {
        return OauthServerType.KAKAO;
    }

    @Override
    public User fetch(String token) {
        KakaoMemberResponse kakaoMemberResponse = kakaoApiClient.fetchMember("Bearer " + token);
        return kakaoMemberResponse.toEntity();
    }
}
