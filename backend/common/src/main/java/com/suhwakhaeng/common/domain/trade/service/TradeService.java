package com.suhwakhaeng.common.domain.trade.service;

import com.suhwakhaeng.common.domain.trade.dto.*;
import com.suhwakhaeng.common.domain.trade.enums.TradeStatus;

import java.util.List;

public interface TradeService {
    TradeCreateResponse createTrade(Long userId, TradeCreateRequest request);
    TradeDetailResponse selectDetailTrade(Long tradeId);
    List<TradeListResponse> selectListTrade(Long userId, TradeSearchRequest tradeSearchRequest);
    List<TradeListResponse> selectMyListTrade(Long userId);
    List<TradeListResponse> selectMyLikeListTrade(Long userId);
    void updateTrade(Long userId, Long tradeId, TradeUpdateRequest tradeUpdateRequest);
    void deleteTrade(Long userId, Long tradeId);
    void updateStatus(Long userId, Long tradeId, TradeStatus status);
    void createLike(Long userId, Long tradeId);
    void deleteLike(Long userId, Long tradeId);
    TradeLikeResponse selectLike(Long userId, Long tradeId);
}
