package com.suhwakhaeng.common.domain.mycrops.exception;

import com.suhwakhaeng.common.domain.trade.exception.TradeErrorCode;
import lombok.Getter;

@Getter
public class MyCropsException extends RuntimeException {
    private final MyCropsErrorCode errorCode;

    public MyCropsException(MyCropsErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
