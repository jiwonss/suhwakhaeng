package com.suhwakhaeng.common.domain.mycrops.controller;

import com.suhwakhaeng.common.domain.mycrops.service.MyCropsService;
import com.suhwakhaeng.common.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/my-crops")
public class MyCropsController {
    private final MyCropsService myCropsService;

    @PostMapping
    public ResponseEntity createMyCrops() {



        return ResponseEntity.ok().body(Message.success());
    }
}
