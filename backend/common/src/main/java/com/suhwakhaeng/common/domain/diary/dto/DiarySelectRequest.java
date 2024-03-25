package com.suhwakhaeng.common.domain.diary.dto;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record DiarySelectRequest(
        Long myCropId,
        LocalDate startDate,
        LocalDate finDate
) {
}
