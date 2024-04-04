package com.suhwakhaeng.chat.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
@AllArgsConstructor
public enum ChatErrorCode {
    CANT_SEND_MESSAGE_MYSELF("자신에게는 메시지를 보낼 수 없습니다.", BAD_REQUEST),
    CANT_FIND_USER("유저를 가져오던 중 에러가 발생했습니다", BAD_REQUEST),
    UNKNOWN_ERROR("알 수 없는 에러가 발생했습니다.", BAD_REQUEST);
    private final String message;
    private final HttpStatus httpStatus;
}
