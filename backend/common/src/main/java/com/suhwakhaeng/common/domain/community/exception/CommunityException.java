package com.suhwakhaeng.common.domain.community.exception;

import com.suhwakhaeng.common.domain.accountbook.exception.AccountBookErrorCode;
import lombok.Getter;

@Getter
public class CommunityException extends RuntimeException {
    private final CommunityErrorCode errorCode;

    public CommunityException(CommunityErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
