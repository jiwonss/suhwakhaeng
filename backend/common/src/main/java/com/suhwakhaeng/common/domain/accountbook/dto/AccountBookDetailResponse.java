package com.suhwakhaeng.common.domain.accountbook.dto;

import com.suhwakhaeng.common.domain.accountbook.enums.Finance;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountBookDetailResponse {
    private Finance finance;
    private String myCropsName;
    private String title;
    private int amount;
    private String content;
    private String image;
}
