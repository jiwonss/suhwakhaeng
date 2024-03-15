package com.suhwakhaeng.common.domain.user.service;

import com.suhwakhaeng.common.domain.user.dto.LoginResponse;
import com.suhwakhaeng.common.global.component.oauth.vendor.enums.OauthServerType;

public interface OauthService {
    LoginResponse login(OauthServerType oauthServerType, String token);
}
