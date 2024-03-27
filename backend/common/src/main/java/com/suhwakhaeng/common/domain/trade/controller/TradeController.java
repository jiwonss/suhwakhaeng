package com.suhwakhaeng.common.domain.trade.controller;

import com.suhwakhaeng.common.domain.trade.dto.TradeCreateRequest;
import com.suhwakhaeng.common.domain.trade.dto.TradeSearchRequest;
import com.suhwakhaeng.common.domain.trade.dto.TradeUpdateRequest;
import com.suhwakhaeng.common.domain.trade.enums.TradeStatus;
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

    @GetMapping("/my/list")
    public ResponseEntity<?> selectMyListTrade(@RequestHeader("X-Authorization-Id") Long userId) {
        return ResponseEntity.ok(Message.success(tradeService.selectMyListTrade(userId)));
    }

    @GetMapping("/like/list")
    public ResponseEntity<?> selectMyLikeListTrade(@RequestHeader("X-Authorization-Id") Long userId) {
        return ResponseEntity.ok(Message.success(tradeService.selectMyLikeListTrade(userId)));
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

    @PatchMapping("/status/{tradeId}")
    public ResponseEntity<?> updateStatus(@RequestHeader("X-Authorization-Id") Long userId, @PathVariable Long tradeId, TradeStatus status) {
        tradeService.updateStatus(userId, tradeId, status);
        return ResponseEntity.ok(Message.success());
    }

    @PostMapping("/like/{tradeId}")
    public ResponseEntity<?> createLike(@RequestHeader("X-Authorization-Id") Long userId, @PathVariable Long tradeId) {
        tradeService.createLike(userId, tradeId);
        return ResponseEntity.ok(Message.success());
    }

    @DeleteMapping("/like/{tradeId}")
    public ResponseEntity<?> deleteLike(@RequestHeader("X-Authorization-Id") Long userId, @PathVariable Long tradeId) {
        tradeService.deleteLike(userId, tradeId);
        return ResponseEntity.ok(Message.success());
    }

    @GetMapping("/like/{tradeId}")
    public ResponseEntity<?> selectLike(@RequestHeader("X-Authorization-Id") Long userId, @PathVariable Long tradeId) {
        return ResponseEntity.ok(Message.success(tradeService.selectLike(userId, tradeId)));
    }
}
