package com.suhwakhaeng.common.domain.diary.exception;

import lombok.Getter;

@Getter
public class DiaryException extends RuntimeException {
    private final DiaryErrorCode errorCode;

    public DiaryException(DiaryErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
