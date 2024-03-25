package com.suhwakhaeng.common.domain.diary.controller;

import com.suhwakhaeng.common.domain.diary.dto.DiaryCreateRequest;
import com.suhwakhaeng.common.domain.diary.service.DiaryService;
import com.suhwakhaeng.common.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/diary")
@RequiredArgsConstructor
public class DiaryController {
    private final DiaryService diaryService;

    @PostMapping
    public ResponseEntity<?> createDiary(@RequestHeader("X-Authorization-Id") Long userId, @RequestBody DiaryCreateRequest diaryCreateRequest) {
        diaryService.createDiary(diaryCreateRequest, userId);
        return ResponseEntity.ok(Message.success());
    }
}
