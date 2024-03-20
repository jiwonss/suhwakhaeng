package com.suhwakhaeng.common.domain.crops.exeption;

import lombok.Getter;

@Getter
public class CropsException extends RuntimeException {

    private final CropsErrorCode errorCode;

    public CropsException(CropsErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

}
