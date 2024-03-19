package com.suhwakhaeng.common.global.component.oauth.vendor.kakao.client;

import com.suhwakhaeng.common.global.component.oauth.vendor.kakao.dto.KakaoMemberResponse;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.service.annotation.GetExchange;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

public interface KakaoApiClient {
    @GetExchange("https://kapi.kakao.com/v2/user/me")
    KakaoMemberResponse fetchMember(@RequestHeader(name = AUTHORIZATION) String bearerToken);
}
