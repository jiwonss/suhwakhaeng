package com.suhwakhaeng.common.domain.trade.service;

import com.suhwakhaeng.common.domain.trade.dto.*;

import java.util.List;

public interface TradeService {
    TradeCreateResponse createTrade(Long userId, TradeCreateRequest request);
    TradeDetailResponse selectDetailTrade(Long tradeId);

    List<TradeListResponse> selectListTrade(Long userId, TradeSearchRequest tradeSearchRequest);
    Boolean selectIsLiked(Long userId, Long tradeId);
}
