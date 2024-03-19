package com.suhwakhaeng.common.domain.trade.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Builder
@Getter
@Setter
public class TradeDetailResponse {
    TradeDetailInfo tradeDetailInfo;
    public static TradeDetailResponse fromInfo(TradeDetailInfo tradeDetailInfo) {
        return TradeDetailResponse.builder()
                .tradeDetailInfo(tradeDetailInfo)
                .build();
    }
}
