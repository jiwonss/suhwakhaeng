package com.suhwakhaeng.apigateway.auth.filter;


import com.suhwakhaeng.apigateway.auth.jwt.JwtUtils;
import com.suhwakhaeng.apigateway.auth.jwt.TokenInfo;
import com.suhwakhaeng.apigateway.error.AuthenticationException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Slf4j
@Component
public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {

    @Value("${jwt.access-key}")
    private String jwtKey;

    @Autowired
    private JwtUtils jwtUtils;

    public AuthorizationHeaderFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        log.info("key, {}", jwtKey);
        return (exchange, chain) -> {

            try {
                String accessToken = exchange.getRequest().getHeaders().get(AUTHORIZATION).get(0).substring(7);

                TokenInfo token = jwtUtils.parseToken(accessToken);

                addAuthorizationHeaders(exchange.getRequest(), token);
            } catch (ExpiredJwtException ex) {
                throw new AuthenticationException("토큰이 만료되었습니다.");
            } catch (MalformedJwtException | SignatureException | IllegalArgumentException |
                     NullPointerException ex) {
                throw new AuthenticationException("인증에 실패하였습니다.");
            }

            return chain.filter(exchange);
        };
    }

    private void addAuthorizationHeaders(ServerHttpRequest request, TokenInfo token) {
        log.info("key, {}", jwtKey);
        request.mutate()
                .header("X-Authorization-Id", token.getUserId())
//                .header("X-Authorization-Role", token.getRole())
                .build();
    }

    static class Config {

    }
}
