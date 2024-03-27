package com.suhwakhaeng.common.domain.community.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum CommunityErrorCode {
    NOT_EXIST_CATEGORY("존재하지 않는 카테고리입니다.", BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;
}
