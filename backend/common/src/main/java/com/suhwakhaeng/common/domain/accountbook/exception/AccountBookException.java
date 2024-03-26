package com.suhwakhaeng.common.domain.accountbook.exception;

import lombok.Getter;

@Getter
public class AccountBookException extends RuntimeException {
    private final AccountBookErrorCode errorCode;

    public AccountBookException(AccountBookErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
