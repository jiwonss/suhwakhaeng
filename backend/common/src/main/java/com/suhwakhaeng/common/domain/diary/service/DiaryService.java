package com.suhwakhaeng.common.domain.diary.service;

import com.suhwakhaeng.common.domain.diary.dto.DiaryCreateRequest;
import com.suhwakhaeng.common.domain.diary.dto.DiaryListResponse;
import com.suhwakhaeng.common.domain.diary.dto.DiarySelectRequest;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface DiaryService {
    void createDiary(DiaryCreateRequest diaryCreateRequest, Long userId);
    void deleteDiary(Long diaryId, Long userId);
    Map<LocalDate, List<DiaryListResponse>> selectDiaryList(Long userId, DiarySelectRequest diarySelectRequest);
}
