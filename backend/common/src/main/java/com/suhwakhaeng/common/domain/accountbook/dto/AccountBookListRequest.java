package com.suhwakhaeng.common.domain.accountbook.dto;

import java.time.LocalDate;

public record AccountBookListRequest(

        LocalDate startDate,
        LocalDate endDate,
        Long myCropsId  // null일 경우 전체
) {
}
