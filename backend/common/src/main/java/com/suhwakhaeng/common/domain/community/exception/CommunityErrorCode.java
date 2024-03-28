package com.suhwakhaeng.common.domain.community.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum CommunityErrorCode {
    NOT_EXIST_CATEGORY("존재하지 않는 카테고리입니다.", BAD_REQUEST),
    NOT_EXIST_COMMUNITY("존재하지 않는 게시글입니다.", BAD_REQUEST),
    NOT_MATCH_USER("게시글의 작성자와 일치하지 않는 유저입니다.", BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;
}
