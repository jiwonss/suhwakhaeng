package com.suhwakhaeng.common.domain.community.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
@AllArgsConstructor
public enum CommentErrorCode {
    NOT_EXIST_COMMENT("존재하지 않는 댓글입니다.", BAD_REQUEST),
    NOT_MATCH_USER("댓글 작성자와 일치하지 않는 유저입니다.", BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;
}
