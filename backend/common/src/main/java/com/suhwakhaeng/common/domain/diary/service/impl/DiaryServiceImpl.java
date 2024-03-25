package com.suhwakhaeng.common.domain.diary.service.impl;

import com.suhwakhaeng.common.domain.diary.dto.DiaryCreateRequest;
import com.suhwakhaeng.common.domain.diary.entity.Diary;
import com.suhwakhaeng.common.domain.diary.exception.DiaryErrorCode;
import com.suhwakhaeng.common.domain.diary.exception.DiaryException;
import com.suhwakhaeng.common.domain.diary.repository.DiaryRepository;
import com.suhwakhaeng.common.domain.diary.service.DiaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService {
    private final DiaryRepository diaryRepository;

    @Override
    public void createDiary(DiaryCreateRequest diaryCreateRequest, Long userId){
        Diary diary = diaryRepository.save(diaryCreateRequest.toEntity());
        if(!diary.getMyCrops().getUser().getId().equals(userId)) throw new DiaryException(DiaryErrorCode.NOT_MATCH_USER);
    }
}
