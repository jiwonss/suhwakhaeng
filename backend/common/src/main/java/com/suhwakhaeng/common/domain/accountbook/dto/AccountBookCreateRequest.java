package com.suhwakhaeng.common.domain.accountbook.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.suhwakhaeng.common.domain.accountbook.entity.AccountBook;
import com.suhwakhaeng.common.domain.accountbook.enums.Finance;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDate;

public record AccountBookCreateRequest(
        Long myCropsId,
        @Pattern(regexp = "수입|지출")
        String finance,
        String title,
        String content,
        int amount,
        String image,

        @PastOrPresent(message = "날짜는 과거 또는 현재의 날짜여야 합니다.")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        LocalDate date
) {

    public AccountBook toEntity() {
        return AccountBook.builder()
                .finance(Finance.fromName(finance))
                .title(title)
                .content(content)
                .amount(amount)
                .image(image)
                .date(date)
                .build();
    }
}
