package com.suhwakhaeng.common.domain.diary.service;

import com.suhwakhaeng.common.domain.diary.dto.DiaryCreateRequest;

public interface DiaryService {
    void createDiary(DiaryCreateRequest diaryCreateRequest, Long userId);
}
