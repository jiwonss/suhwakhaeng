package com.suhwakhaeng.common.domain.mycrops.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
@AllArgsConstructor
public enum MyCropsErrorCode {
    NOT_MATCH_MY_CROPS("존제하지 않는 작물입니다.", BAD_REQUEST);
    private final String message;
    private final HttpStatus httpStatus;
}
