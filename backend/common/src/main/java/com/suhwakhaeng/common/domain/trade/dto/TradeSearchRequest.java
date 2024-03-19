package com.suhwakhaeng.common.domain.trade.dto;

import com.suhwakhaeng.common.domain.trade.enums.TradeCate;
import lombok.Builder;

@Builder
public record TradeSearchRequest(
        String keyword,
        TradeCate cate,
        Long id
) {
}
