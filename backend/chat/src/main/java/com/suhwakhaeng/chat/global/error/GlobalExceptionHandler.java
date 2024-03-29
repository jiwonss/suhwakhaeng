package com.suhwakhaeng.chat.global.error;

import com.suhwakhaeng.chat.exception.ChatException;
import com.suhwakhaeng.chat.global.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Arrays;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> invalidInputExceptionHandler(MethodArgumentNotValidException e) {
        log.debug(Arrays.toString(e.getStackTrace()));
        return ResponseEntity.ok(Message.fail(String.valueOf(ErrorCode.INVALID_INPUT), ErrorCode.INVALID_INPUT.getMessage()));
    }

    @ExceptionHandler(ChatException.class)
    public ResponseEntity<?> userExceptionHandler(ChatException e){
        log.debug(Arrays.toString(e.getStackTrace()));
        return ResponseEntity.ok(Message.fail(String.valueOf(e.getErrorCode()), e.getMessage()));
    }
}
