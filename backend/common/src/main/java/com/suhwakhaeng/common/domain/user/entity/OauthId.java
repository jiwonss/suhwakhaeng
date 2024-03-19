package com.suhwakhaeng.common.domain.user.entity;

import com.suhwakhaeng.common.global.component.oauth.vendor.enums.OauthServerType;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import static jakarta.persistence.EnumType.STRING;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class OauthId {

    @Column(name = "provider_id", nullable = false)
    private String oauthServerId;

    @Enumerated(STRING)
    @Column(name = "provider", nullable = false)
    private OauthServerType oauthServerType;

}
