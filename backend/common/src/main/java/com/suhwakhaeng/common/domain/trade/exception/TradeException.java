package com.suhwakhaeng.common.domain.trade.exception;

import lombok.Getter;

@Getter
public class TradeException extends RuntimeException {
    private final TradeErrorCode errorCode;

    public TradeException(TradeErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
