package com.suhwakhaeng.common.domain.trade.controller;

import com.suhwakhaeng.common.domain.trade.dto.TradeCreateRequest;
import com.suhwakhaeng.common.domain.trade.service.TradeService;
import com.suhwakhaeng.common.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/trades")
@RequiredArgsConstructor
public class TradeController {
    private final TradeService tradeService;

    /**
     * 거래 글 작성
     * @author 김수린
     * @param userId
     * @param request
     * @return
     */
    @PostMapping
    public ResponseEntity<?> createTrade(@RequestHeader("X-Authorization-Id") Long userId, @RequestBody TradeCreateRequest request) {
        tradeService.createTrade(userId, request);
        return ResponseEntity.ok(Message.success());
    }

    @GetMapping("/list")
    public ResponseEntity<?> selectListTrade() {

        return ResponseEntity.ok(Message.success());
    }

    @PatchMapping("/{tradeId}")
    public ResponseEntity<?> updateTrade() {

        return ResponseEntity.ok(Message.success());
    }

    @DeleteMapping("/{tradeId}")
    public ResponseEntity<?> deleteTrade() {

        return ResponseEntity.ok(Message.success());
    }

    @GetMapping("/{tradeId}")
    public ResponseEntity<?> selectDetailTrade() {

        return ResponseEntity.ok(Message.success());
    }
}
