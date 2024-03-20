package com.suhwakhaeng.common.global.error;

import com.suhwakhaeng.common.domain.crops.exeption.CropsException;
import com.suhwakhaeng.common.domain.trade.exception.TradeException;
import com.suhwakhaeng.common.domain.user.exception.UserException;
import com.suhwakhaeng.common.global.common.dto.Message;
import com.suhwakhaeng.common.global.error.exception.ErrorCode;
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

    @ExceptionHandler(CropsException.class)
    public ResponseEntity<?> cropsExceptionHandler(CropsException e){
        log.debug(Arrays.toString(e.getStackTrace()));
        return ResponseEntity.ok(Message.fail(String.valueOf(e.getErrorCode()), e.getMessage()));
    }
}
