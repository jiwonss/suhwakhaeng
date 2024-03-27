package com.suhwakhaeng.common.domain.accountbook.dto;

import com.suhwakhaeng.common.domain.accountbook.enums.Finance;
import com.suhwakhaeng.common.domain.mycrops.dto.MyCropsSimpleResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountBookResponse {

    // 수입
    private int income;
    
    // 지출
    private int expenditure;

    List<Content> contents = new ArrayList<>();

    @Getter
    @AllArgsConstructor
    public static class Content {
        private Long accountBookId;
        MyCropsSimpleResponse myCropsSimpleResponse;
        private String title;
        private int amount;
        private Finance finance;
    }

    public AccountBookResponse(List<Content> contents) {
        for (int i = 0; i < contents.size(); i++) {
            Content content = contents.get(i);
            this.contents.add(content);

            if (Finance.INCOME == content.finance) {
                this.income += content.amount;
            }

            if (Finance.EXPENDITURE == content.finance) {
                this.expenditure += content.amount;
            }
        }
    }
}
