package com.suhwakhaeng.common.domain.trade.service.impl;

import com.suhwakhaeng.common.domain.trade.Exception.TradeErrorCode;
import com.suhwakhaeng.common.domain.trade.Exception.TradeException;
import com.suhwakhaeng.common.domain.trade.dto.TradeCreateRequest;
import com.suhwakhaeng.common.domain.trade.dto.TradeDetailInfo;
import com.suhwakhaeng.common.domain.trade.dto.TradeDetailResponse;
import com.suhwakhaeng.common.domain.trade.entity.TradeBoard;
import com.suhwakhaeng.common.domain.trade.repository.TradeRepository;
import com.suhwakhaeng.common.domain.trade.service.TradeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
public class TradeServiceImpl implements TradeService {
    private final TradeRepository tradeRepository;

    @Override
    public TradeDetailResponse createTrade(Long userId, TradeCreateRequest request) {
        TradeBoard tradeBoard = tradeRepository.save(request.toEntity());
        return selectDetailTrade(userId, tradeBoard.getId());
    }

    @Override
    public TradeDetailResponse selectDetailTrade(Long userId, Long tradeId) {
        TradeBoard tradeBoard = tradeRepository.findTradeBoardById(tradeId).orElseThrow(() -> new TradeException(TradeErrorCode.NO_EXIST_TRADE));
        TradeDetailInfo tradeDetailInfo = TradeDetailInfo.fromTradeTable(tradeBoard);
        return TradeDetailResponse.fromInfo(tradeDetailInfo);
    }

    @Override
    public Boolean selectIsLiked(Long userId, Long tradeId) {
        return false;
    }
}
