package com.suhwakhaeng.common.domain.crops.exeption;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
@AllArgsConstructor
public enum CropsErrorCode {
    NO_EXIST_CROPS("존재하지 않는 작물입니다.", BAD_REQUEST);
    private final String message;
    private final HttpStatus httpStatus;
}
