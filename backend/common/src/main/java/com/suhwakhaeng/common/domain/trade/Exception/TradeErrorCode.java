package com.suhwakhaeng.common.domain.trade.Exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum TradeErrorCode {
    NO_EXIST_TRADE("존재하지 않는 게시글입니다.", BAD_REQUEST);
    private final String message;
    private final HttpStatus httpStatus;
}
