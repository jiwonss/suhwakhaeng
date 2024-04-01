package com.suhwakhaeng.common.domain.trade.repository;

import com.suhwakhaeng.common.domain.trade.dto.TradeListResponse;
import com.suhwakhaeng.common.domain.trade.dto.TradeMyListRequest;
import com.suhwakhaeng.common.domain.trade.dto.TradeSearchRequest;

import java.util.List;

public interface TradeSearchRepository {
    List<TradeListResponse> searchTrade(Long userId, TradeSearchRequest tradeSearchRequest);
    List<TradeListResponse> searchMyTrade(Long userId, TradeMyListRequest request);
    List<TradeListResponse> searchMyLikeTrade(Long userId, TradeMyListRequest request);
}
