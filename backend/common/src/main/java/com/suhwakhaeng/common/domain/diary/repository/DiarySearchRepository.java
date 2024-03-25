package com.suhwakhaeng.common.domain.diary.repository;

import com.suhwakhaeng.common.domain.diary.dto.DiaryListResponse;
import com.suhwakhaeng.common.domain.diary.dto.DiarySelectRequest;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DiarySearchRepository {
    List<DiaryListResponse> searchDiaryList(Long userId, DiarySelectRequest diarySelectRequest);
}
