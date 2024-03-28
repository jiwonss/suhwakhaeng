package com.suhwakhaeng.common.domain.trade.dto;

import com.suhwakhaeng.common.domain.trade.enums.TradeStatus;

public record TradeStatusUpdateRequest(
        TradeStatus status
) {
}
