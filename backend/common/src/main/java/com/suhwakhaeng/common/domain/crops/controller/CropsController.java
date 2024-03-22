package com.suhwakhaeng.common.domain.crops.controller;

import com.suhwakhaeng.common.domain.crops.dto.CropsCreateRequest;
import com.suhwakhaeng.common.domain.crops.dto.CropsVarietyCreateRequest;
import com.suhwakhaeng.common.domain.crops.service.CropsService;
import com.suhwakhaeng.common.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/crops")
@RequiredArgsConstructor
public class CropsController {

    private final CropsService cropsService;

    // 작물 등록(작물, 재배적 특성, 작형별 출하시기 표)
    @PostMapping
    public ResponseEntity createCrops(@RequestBody CropsCreateRequest cropsCreateRequest) {
        log.info("cropsCreateRequest : {}", cropsCreateRequest);
        cropsService.createCrops(cropsCreateRequest);
        return ResponseEntity.ok(Message.success());
    }

    // 작물 품종 등록
    @PostMapping("/variety")
    public ResponseEntity createCropsVariety(@RequestBody CropsVarietyCreateRequest cropsVarietyCreateRequest) {
        log.info("cropsVarietyCreateRequest : {}", cropsVarietyCreateRequest);
        cropsService.createCropsVariety(cropsVarietyCreateRequest);
        return ResponseEntity.ok(Message.success());
    }

    @GetMapping
    public ResponseEntity selectListCrops(@RequestParam String keyword) {
        return ResponseEntity.ok(Message.success(cropsService.selectListCrops(keyword)));
    }

    @GetMapping("/{cropsId}/variety")
    public ResponseEntity selectListCropsVariety(@PathVariable Long cropsId) {
        return ResponseEntity.ok(Message.success(cropsService.selectListCropsVariety(cropsId)));
    }

}
