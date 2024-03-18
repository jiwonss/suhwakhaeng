package com.suhwakhaeng.common.domain.trade.service;

import com.suhwakhaeng.common.domain.trade.dto.TradeCreateRequest;
import com.suhwakhaeng.common.domain.trade.dto.TradeDetailResponse;
import com.suhwakhaeng.common.domain.trade.repository.TradeRepository;

public interface TradeService {
    TradeDetailResponse createTrade(Long userId, TradeCreateRequest request);
    TradeDetailResponse selectDetailTrade(Long userId, Long tradeId);
    Boolean selectIsLiked(Long userId, Long tradeId);
}
