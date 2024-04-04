package com.suhwakhaeng.common.global.component.jwt.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Getter
@AllArgsConstructor
public enum JwtErrorCode {
    INVALID_TOKEN("사용할 수 없는 토큰 입니다.", UNAUTHORIZED);

    private final String message;
    private final HttpStatus httpStatus;
}
