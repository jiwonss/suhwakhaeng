package com.suhwakhaeng.common.global.component.oauth;

import com.suhwakhaeng.common.global.component.oauth.vendor.enums.OauthServerType;
import org.springframework.core.convert.converter.Converter;

public class OauthServerTypeConverter implements Converter<String, OauthServerType> {

    @Override
    public OauthServerType convert(String source) {
        return OauthServerType.fromName(source);
    }
}
