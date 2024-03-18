package com.suhwakhaeng.common.global.component.oauth.vendor.enums;

import java.util.Locale;

public enum OauthServerType {
    KAKAO,
    ;

    public static OauthServerType fromName(String type) {
        return OauthServerType.valueOf(type.toUpperCase(Locale.ENGLISH));
    }
}
