package com.suhwakhaeng.common.domain.mycrops.controller;

import com.suhwakhaeng.common.domain.mycrops.dto.MyCropsRequest;
import com.suhwakhaeng.common.domain.mycrops.service.MyCropsService;
import com.suhwakhaeng.common.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/my-crops")
public class MyCropsController {
    private final MyCropsService myCropsService;

    @PostMapping
    public ResponseEntity createMyCrops(@RequestHeader("X-Authorization-Id") Long userId, @RequestBody MyCropsRequest request) {
        myCropsService.createMyCrops(userId, request);
        return ResponseEntity.ok().body(Message.success());
    }

    @GetMapping
    public ResponseEntity selectMyCrops(@RequestHeader("X-Authorization-Id") Long userId) {
        return ResponseEntity.ok().body(Message.success(myCropsService.selectMyCrops(userId)));
    }

    @GetMapping("/simple")
    public ResponseEntity selectMyCropsSimple(@RequestHeader("X-Authorization-Id") Long userId) {
        return ResponseEntity.ok().body(Message.success(myCropsService.selectMyCropsSimple(userId)));
    }

    @GetMapping("/{myCropsId}")
    public ResponseEntity selectMyCropsDetail(@PathVariable Long myCropsId) {
        return ResponseEntity.ok().body(Message.success(myCropsService.selectMyCropsDetail(myCropsId)));
    }
}
