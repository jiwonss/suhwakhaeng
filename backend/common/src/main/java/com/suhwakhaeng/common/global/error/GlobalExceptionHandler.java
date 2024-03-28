package com.suhwakhaeng.common.global.error;

import com.suhwakhaeng.common.domain.accountbook.exception.AccountBookException;
import com.suhwakhaeng.common.domain.community.exception.CommunityException;
import com.suhwakhaeng.common.domain.crops.entity.CropsVariety;
import com.suhwakhaeng.common.domain.crops.exeption.CropsException;
import com.suhwakhaeng.common.domain.crops.exeption.CropsVarietyException;
import com.suhwakhaeng.common.domain.diary.exception.DiaryException;
import com.suhwakhaeng.common.domain.fcm.exception.FcmException;
import com.suhwakhaeng.common.domain.mycrops.exception.MyCropsException;
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

    @ExceptionHandler(DiaryException.class)
    public ResponseEntity<?> diaryExceptionHandler(DiaryException e){
        log.debug(Arrays.toString(e.getStackTrace()));
        return ResponseEntity.ok(Message.fail(String.valueOf(e.getErrorCode()), e.getMessage()));
    }

    @ExceptionHandler(FcmException.class)
    public ResponseEntity<?> fcmExceptionHandler(FcmException e){
        log.debug(Arrays.toString(e.getStackTrace()));
        return ResponseEntity.ok(Message.fail(String.valueOf(e.getErrorCode()), e.getMessage()));
    }

    @ExceptionHandler(MyCropsException.class)
    public ResponseEntity<?> myCropsExceptionHandler(MyCropsException e){
        log.debug(Arrays.toString(e.getStackTrace()));
        return ResponseEntity.ok(Message.fail(String.valueOf(e.getErrorCode()), e.getMessage()));
    }

    @ExceptionHandler(CropsException.class)
    public ResponseEntity<?> cropsExceptionHandler(CropsException e){
        log.debug(Arrays.toString(e.getStackTrace()));
        return ResponseEntity.ok(Message.fail(String.valueOf(e.getErrorCode()), e.getMessage()));
    }

    @ExceptionHandler(CropsVarietyException.class)
    public ResponseEntity<?> cropsVarietyExceptionHandler(CropsVarietyException e){
        log.debug(Arrays.toString(e.getStackTrace()));
        return ResponseEntity.ok(Message.fail(String.valueOf(e.getErrorCode()), e.getMessage()));
    }

    @ExceptionHandler(AccountBookException.class)
    public ResponseEntity<?> accountBookExceptionHandler(AccountBookException e){
        log.debug(Arrays.toString(e.getStackTrace()));
        return ResponseEntity.ok(Message.fail(String.valueOf(e.getErrorCode()), e.getMessage()));
    }

    @ExceptionHandler(CommunityException.class)
    public ResponseEntity<?> communityExceptionHandler(CommunityException e) {
        log.debug(Arrays.toString(e.getStackTrace()));
        return ResponseEntity.ok(Message.fail(String.valueOf(e.getErrorCode()), e.getMessage()));
    }
}
