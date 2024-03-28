package com.suhwakhaeng.common.domain.fcm.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
@AllArgsConstructor
public enum FcmErrorCode {
    SUBSCRIBE_FAIL("토픽 구독에 실패했습니다.", BAD_REQUEST),
    INIT_FAIL("FCM 서버 세팅 중 에러가 발생했습니다.", BAD_REQUEST),
    NO_EXIST_USER("유저가 존재하지 않습니다.", BAD_REQUEST),
    CAN_NOT_SEND_NOTIFICATION("푸시 알림 전송에 실패했습니다.", BAD_REQUEST),
    NO_EXIST_TOKEN("디바이스 토큰이 존재하지 않습니다.", BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;
}
