package com.suhwakhaeng.common.domain.user.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
@AllArgsConstructor
public enum UserErrorCode {
    NOT_EXIST_USER("존재하지 않는 회원입니다.", BAD_REQUEST),
    NOT_VALID_ROLE("해당 역할은 존재하지 않습니다.", BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;
}
