package com.suhwakhaeng.common.domain.diary.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
@AllArgsConstructor
public enum DiaryErrorCode {
    UNKNOWN_SELECT_ERROR("일지 선택 중 알 수 없는 에러가 발생했습니다.", BAD_REQUEST),
    NO_EXIST_DIARY("존재하지 않는 일지입니다.", BAD_REQUEST),
    CANT_SAVE_DIARY("다이어리 저장에 실패했습니다.", BAD_REQUEST),
    NOT_MATCH_USER("일지의 작성자와 일치하지 않는 유저입니다.", BAD_REQUEST);
    private final String message;
    private final HttpStatus httpStatus;
}
