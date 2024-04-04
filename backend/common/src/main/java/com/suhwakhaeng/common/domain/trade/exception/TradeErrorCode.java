package com.suhwakhaeng.common.domain.trade.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum TradeErrorCode {
    NO_EXIST_TRADE("존재하지 않는 게시글입니다.", BAD_REQUEST),
    NOT_MATCH_USER("게시글의 작성자와 일치하지 않는 유저입니다.", BAD_REQUEST);
    private final String message;
    private final HttpStatus httpStatus;
}
