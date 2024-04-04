package com.suhwakhaeng.common.global.component.jwt.exception;

import lombok.Getter;

@Getter
public class JwtException extends RuntimeException {
    private final JwtErrorCode errorCode;

    public JwtException(JwtErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
