package com.suhwakhaeng.common.domain.diary.service.impl;

import com.suhwakhaeng.common.domain.diary.dto.DiaryCreateRequest;
import com.suhwakhaeng.common.domain.diary.dto.DiaryListResponse;
import com.suhwakhaeng.common.domain.diary.dto.DiarySelectRequest;
import com.suhwakhaeng.common.domain.diary.entity.Diary;
import com.suhwakhaeng.common.domain.diary.exception.DiaryErrorCode;
import com.suhwakhaeng.common.domain.diary.exception.DiaryException;
import com.suhwakhaeng.common.domain.diary.repository.DiaryRepository;
import com.suhwakhaeng.common.domain.diary.repository.DiarySearchRepository;
import com.suhwakhaeng.common.domain.diary.service.DiaryService;
import com.suhwakhaeng.common.domain.mycrops.entity.MyCrops;
import com.suhwakhaeng.common.domain.mycrops.repository.MyCropsRepository;
import com.suhwakhaeng.common.domain.mycrops.service.MyCropsService;
import com.suhwakhaeng.common.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService {
    private final DiaryRepository diaryRepository;
    private final DiarySearchRepository diarySearchRepository;
    private final MyCropsService myCropsService;

    @Transactional
    @Override
    public void createDiary(DiaryCreateRequest diaryCreateRequest, Long userId){
        MyCrops myCrops = myCropsService.selectMyCrop(diaryCreateRequest.myCropsId());
        Diary diary = diaryRepository.save(diaryCreateRequest.toEntity(myCrops));
        if(diary.getMyCrops() == null || diary.getMyCrops().getUser() == null) throw new DiaryException(DiaryErrorCode.CANT_SAVE_DIARY);
        if(!diary.getMyCrops().getUser().getId().equals(userId)) throw new DiaryException(DiaryErrorCode.NOT_MATCH_USER);
    }

    @Transactional
    @Override
    public void deleteDiary(Long diaryId, Long userId) {
        Diary diary = diaryRepository.findById(diaryId).orElseThrow(() -> new DiaryException(DiaryErrorCode.NO_EXIST_DIARY));
        if(!diary.getMyCrops().getUser().getId().equals(userId)) throw new DiaryException(DiaryErrorCode.NOT_MATCH_USER);
        diaryRepository.delete(diary);
    }

    @Override
    public Map<LocalDate, List<DiaryListResponse>> selectDiaryList(Long userId, DiarySelectRequest diarySelectRequest) {
        return diarySearchRepository.searchDiaryList(userId, diarySelectRequest);
    }
}
