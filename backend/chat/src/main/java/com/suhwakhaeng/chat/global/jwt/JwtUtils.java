package com.suhwakhaeng.chat.global.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtUtils {
    private final JwtProps props;
    private static final String CLAIM_ROLE = "role";

    public TokenInfo parseToken(String token) {
        String userId = getPayload(token).getId();

        String role = (String) getPayload(token).get(CLAIM_ROLE);

        return TokenInfo.builder()
                .userId(userId)
                .role(role)
                .build();
    }

    private Claims getPayload(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(props.getAccessKey().getBytes()))
                .build()
                .parseSignedClaims(token).getPayload();
    }
}
