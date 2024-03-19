package com.suhwakhaeng.common.domain.trade.controller;

import com.suhwakhaeng.common.domain.trade.dto.TradeCreateRequest;
import com.suhwakhaeng.common.domain.trade.dto.TradeSearchRequest;
import com.suhwakhaeng.common.domain.trade.dto.TradeUpdateRequest;
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
        return ResponseEntity.ok(Message.success(tradeService.createTrade(userId, request)));
    }

    @GetMapping("/{tradeId}")
    public ResponseEntity<?> selectDetailTrade(@PathVariable Long tradeId) {
        return ResponseEntity.ok(Message.success(tradeService.selectDetailTrade(tradeId)));
    }

    @GetMapping("/list")
    public ResponseEntity<?> selectListTrade(@RequestHeader("X-Authorization-Id") Long userId, @ModelAttribute TradeSearchRequest tradeSearchRequest) {
        return ResponseEntity.ok(Message.success(tradeService.selectListTrade(userId, tradeSearchRequest)));
    }

    @PatchMapping("/{tradeId}")
    public ResponseEntity<?> updateTrade(@RequestHeader("X-Authorization-Id") Long userId, @PathVariable Long tradeId, @RequestBody TradeUpdateRequest request) {
        tradeService.updateTrade(userId, tradeId, request);
        return ResponseEntity.ok(Message.success());
    }

    @DeleteMapping("/{tradeId}")
    public ResponseEntity<?> deleteTrade(@RequestHeader("X-Authorization-Id") Long userId, @PathVariable Long tradeId) {
        tradeService.deleteTrade(userId, tradeId);
        return ResponseEntity.ok(Message.success());
    }
}
