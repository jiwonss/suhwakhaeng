package com.suhwakhaeng.chat.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
@AllArgsConstructor
public enum ChatErrorCode {
    UNKNOWN_ERROR("알 수 없는 에러가 발생했습니다.", BAD_REQUEST);
    private final String message;
    private final HttpStatus httpStatus;
}
