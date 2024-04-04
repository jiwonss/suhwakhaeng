package com.suhwakhaeng.common.domain.crops.exeption;

import lombok.Getter;

@Getter
public class CropsVarietyException extends RuntimeException {
    private final CropsVarietyErrorCode errorCode;

    public CropsVarietyException(CropsVarietyErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
