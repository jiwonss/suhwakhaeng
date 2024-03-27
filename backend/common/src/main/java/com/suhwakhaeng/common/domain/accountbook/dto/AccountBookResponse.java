package com.suhwakhaeng.common.domain.accountbook.dto;

import com.suhwakhaeng.common.domain.accountbook.enums.Finance;
import com.suhwakhaeng.common.domain.mycrops.dto.MyCropsSimpleResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountBookResponse {
    // 수입
    private int income;
    
    // 지출
    private int expenditure;

    Map<LocalDate, List<Content>> contents = new TreeMap<>();

    @Getter
    @AllArgsConstructor
    public static class Content {
        private Long accountBookId;
        MyCropsSimpleResponse myCropsSimpleResponse;
        private String title;
        private int amount;
        private Finance finance;
        private LocalDate date;
    }

    public AccountBookResponse(List<Content> contents) {
        for (Content content : contents) {
            this.contents.putIfAbsent(content.date, new ArrayList<>());
            this.contents.get(content.date).add(content);

            if (Finance.INCOME == content.finance) {
                this.income += content.amount;
            }

            if (Finance.EXPENDITURE == content.finance) {
                this.expenditure += content.amount;
            }
        }

    }
}
