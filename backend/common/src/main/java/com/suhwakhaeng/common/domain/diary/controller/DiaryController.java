package com.suhwakhaeng.common.domain.diary.controller;

import com.suhwakhaeng.common.domain.diary.dto.DiaryCreateRequest;
import com.suhwakhaeng.common.domain.diary.dto.DiarySelectRequest;
import com.suhwakhaeng.common.domain.diary.service.DiaryService;
import com.suhwakhaeng.common.global.common.annotation.CustomPreAuthorize;
import com.suhwakhaeng.common.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/diary")
@RequiredArgsConstructor
public class DiaryController {
    private final DiaryService diaryService;

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @PostMapping
    public ResponseEntity<?> createDiary(@RequestHeader("X-Authorization-Id") Long userId, @RequestBody DiaryCreateRequest diaryCreateRequest) {
        diaryService.createDiary(diaryCreateRequest, userId);
        return ResponseEntity.ok(Message.success());
    }

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @GetMapping("/list")
    public ResponseEntity<?> selectDiary(@RequestHeader("X-Authorization-Id") Long userId, @ModelAttribute DiarySelectRequest diarySelectRequest) {
        return ResponseEntity.ok(Message.success(diaryService.selectDiaryList(userId, diarySelectRequest)));
    }

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @DeleteMapping("/{diaryId}")
    public ResponseEntity<?> deleteDiary(@RequestHeader("X-Authorization-Id") Long userId, @PathVariable Long diaryId) {
        diaryService.deleteDiary(diaryId, userId);
        return ResponseEntity.ok(Message.success());
    }
}
