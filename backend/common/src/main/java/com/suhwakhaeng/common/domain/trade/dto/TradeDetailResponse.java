package com.suhwakhaeng.common.domain.trade.dto;

import com.suhwakhaeng.common.domain.user.dto.UserInfoResponse;
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
    UserInfoResponse userInfo;

    public static TradeDetailResponse fromInfo(TradeDetailInfo tradeDetailInfo, UserInfoResponse userInfoResponse) {
        return TradeDetailResponse.builder()
                .tradeDetailInfo(tradeDetailInfo)
                .userInfo(userInfoResponse)
                .build();
    }
}
