package com.suhwakhaeng.common.global.error.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    INVALID_INPUT("잘못된 입력입니다.", BAD_REQUEST),
    ACCESS_DENIED("접근할 수 없습니다.", BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;
}
