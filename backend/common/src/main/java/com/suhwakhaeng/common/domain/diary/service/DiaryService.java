package com.suhwakhaeng.common.domain.diary.service;

import com.suhwakhaeng.common.domain.diary.dto.DiaryCreateRequest;
import com.suhwakhaeng.common.domain.diary.dto.DiaryListResponse;
import com.suhwakhaeng.common.domain.diary.dto.DiarySelectRequest;

import java.util.List;

public interface DiaryService {
    void createDiary(DiaryCreateRequest diaryCreateRequest, Long userId);
    List<DiaryListResponse> selectDiaryList(Long userId, DiarySelectRequest diarySelectRequest);
}
