package com.suhwakhaeng.common.global.component.jwt;

import com.suhwakhaeng.common.global.common.dto.UserInfo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.json.BasicJsonParser;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Base64;
import java.util.Date;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtProvider {
    private final JwtProps props;

    private static final String CLAIM_ROLE = "role";

    public String issueAccessToken(Long userId, String role) {

        Claims claims = Jwts.claims()
                .id(String.valueOf(userId))
                .add(CLAIM_ROLE, role)
                .build();

        return issueToken(claims, props.accessExpiration(), props.accessKey());
    }

    public String issueRefreshToken() {
        return issueToken(null, props.accessExpiration(), props.refreshKey());
    }

    private String issueToken(Claims claims, Duration expiration, String secretKey) {
        Date now = new Date();

        return Jwts.builder()
                .claims(claims)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + expiration.toMillis()))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .compact();
    }

//    JWT의 payload에서 직접 데이터 꺼내오기
    public UserInfo parseAccessTokenByBase64(String accessToken) {
//        JWT는 head.payload.sign 형태로 이루어져 있다.
//        여기서 payload를 꺼내기 위한 분리
        String payload = accessToken.split("\\.")[1];

        String decodePayload = new String(Base64.getUrlDecoder().decode(payload));

        BasicJsonParser jsonParser = new BasicJsonParser();

        Map<String, Object> map = jsonParser.parseMap(decodePayload);

        return UserInfo.builder()
                .userId(Long.valueOf((String) (map.get("jti"))))
                .role((String) map.get(CLAIM_ROLE))
                .build();
    }
}
