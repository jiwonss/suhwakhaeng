package com.suhwakhaeng.common.domain.user.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
@AllArgsConstructor
public enum BusinessErrorCode {
    NOT_EXIST_BUSINESS("해당 사업자 요청은 존재하지 않습니다.", BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;
}
