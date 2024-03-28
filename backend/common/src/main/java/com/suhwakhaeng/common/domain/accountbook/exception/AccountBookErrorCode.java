package com.suhwakhaeng.common.domain.accountbook.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
@AllArgsConstructor
public enum AccountBookErrorCode {
    NOT_EXIST_FINANCE("존재하지 않는 회원입니다.", BAD_REQUEST),
    NOT_EXIST_ACCOUNT_BOOK("존재하지 않는 장부입니다.", BAD_REQUEST),
    ;


    private final String message;
    private final HttpStatus httpStatus;
}
