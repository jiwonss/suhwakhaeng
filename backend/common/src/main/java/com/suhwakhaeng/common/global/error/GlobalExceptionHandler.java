package com.suhwakhaeng.common.global.error;

import com.suhwakhaeng.common.domain.trade.Exception.TradeException;
import com.suhwakhaeng.common.domain.user.exception.UserException;
import com.suhwakhaeng.common.global.common.dto.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Arrays;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(UserException.class)
    public ResponseEntity<?> userExceptionHandler(UserException e){
        log.debug(Arrays.toString(e.getStackTrace()));
        return ResponseEntity.ok(Message.fail(String.valueOf(e.getErrorCode()), e.getMessage()));
    }

    @ExceptionHandler(TradeException.class)
    public ResponseEntity<?> tradeExceptionHandler(TradeException e){
        log.debug(Arrays.toString(e.getStackTrace()));
        return ResponseEntity.ok(Message.fail(String.valueOf(e.getErrorCode()), e.getMessage()));
    }
}
