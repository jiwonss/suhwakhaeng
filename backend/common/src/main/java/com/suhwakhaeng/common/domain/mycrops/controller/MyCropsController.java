package com.suhwakhaeng.common.domain.mycrops.controller;

import com.suhwakhaeng.common.domain.mycrops.dto.MyCropsCreateRequest;
import com.suhwakhaeng.common.domain.mycrops.dto.MyCropsUpdateRequest;
import com.suhwakhaeng.common.domain.mycrops.service.MyCropsService;
import com.suhwakhaeng.common.global.common.annotation.CustomPreAuthorize;
import com.suhwakhaeng.common.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/my-crops")
public class MyCropsController {
    private final MyCropsService myCropsService;

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @PostMapping
    public ResponseEntity createMyCrops(@RequestHeader("X-Authorization-Id") Long userId, @RequestBody MyCropsCreateRequest request) {
        myCropsService.createMyCrops(userId, request);
        return ResponseEntity.ok().body(Message.success());
    }

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @GetMapping
    public ResponseEntity selectMyCrops(@RequestHeader("X-Authorization-Id") Long userId) {
        return ResponseEntity.ok().body(Message.success(myCropsService.selectMyCrops(userId)));
    }

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @GetMapping("/simple")
    public ResponseEntity selectMyCropsSimple(@RequestHeader("X-Authorization-Id") Long userId) {
        return ResponseEntity.ok().body(Message.success(myCropsService.selectMyCropsSimple(userId)));
    }

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @GetMapping("/{myCropsId}")
    public ResponseEntity selectMyCropsDetail(@PathVariable Long myCropsId) {
        return ResponseEntity.ok().body(Message.success(myCropsService.selectMyCropsDetail(myCropsId)));
    }

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @DeleteMapping("/{myCropsId}")
    public ResponseEntity deleteMyCrops(@PathVariable Long myCropsId) {
        myCropsService.deleteMyCrops(myCropsId);
        return ResponseEntity.ok().body(Message.success());
    }

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @PatchMapping("/{myCropsId}")
    public ResponseEntity updateMyCrops(@RequestHeader("X-Authorization-Id") Long userId, @PathVariable Long myCropsId, @RequestBody MyCropsUpdateRequest request) {
        myCropsService.updateMyCrops(myCropsId, request);
        return ResponseEntity.ok().body(Message.success());
    }
}
