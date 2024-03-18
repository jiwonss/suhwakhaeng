package com.suhwakhaeng.common.global.component.oauth;

import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.global.component.oauth.vendor.enums.OauthServerType;

public interface OauthMemberClient {
    OauthServerType supportServer();

    User fetch(String token);
}
