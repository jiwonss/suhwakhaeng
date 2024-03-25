package com.suhwakhaeng.common.domain.diary.dto;

import com.suhwakhaeng.common.domain.mycrops.dto.MyCropsSimpleResponse;
import com.suhwakhaeng.common.domain.mycrops.entity.MyCrops;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record DiaryListResponse(
    Long diaryId,
    String diaryContent,
    LocalDate diaryDate,
    MyCropsSimpleResponse myCropsSimpleResponse,
    String diaryMemo,
    String diaryImage
) { }
