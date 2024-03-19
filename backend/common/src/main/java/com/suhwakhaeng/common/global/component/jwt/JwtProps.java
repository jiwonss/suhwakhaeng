package com.suhwakhaeng.common.global.component.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

@ConfigurationProperties(prefix = "jwt")
public record JwtProps(
        String accessKey,
        String refreshKey,
        Duration accessExpiration,
        Duration refreshExpiration
) {
}
