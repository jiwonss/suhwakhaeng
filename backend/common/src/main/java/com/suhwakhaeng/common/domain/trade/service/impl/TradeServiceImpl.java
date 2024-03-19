package com.suhwakhaeng.common.domain.trade.service.impl;

import com.suhwakhaeng.common.domain.trade.Exception.TradeErrorCode;
import com.suhwakhaeng.common.domain.trade.Exception.TradeException;
import com.suhwakhaeng.common.domain.trade.dto.*;
import com.suhwakhaeng.common.domain.trade.entity.TradeBoard;
import com.suhwakhaeng.common.domain.trade.repository.TradeRepository;
import com.suhwakhaeng.common.domain.trade.repository.TradeSearchRepository;
import com.suhwakhaeng.common.domain.trade.service.TradeService;
import com.suhwakhaeng.common.domain.user.dto.UserInfoResponse;
import com.suhwakhaeng.common.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
public class TradeServiceImpl implements TradeService {
    private final TradeRepository tradeRepository;
    private final TradeSearchRepository tradeSearchRepository;
    private final UserService userService;

    @Override
    public TradeCreateResponse createTrade(Long userId, TradeCreateRequest request) {
        TradeBoard tradeBoard = tradeRepository.save(request.toEntity(userId));
        return TradeCreateResponse.builder().id(tradeBoard.getId()).build();
    }

    @Transactional(readOnly = true)
    @Override
    public TradeDetailResponse selectDetailTrade(Long tradeId) {
        TradeBoard tradeBoard = tradeRepository.findTradeBoardById(tradeId).orElseThrow(() -> new TradeException(TradeErrorCode.NO_EXIST_TRADE));
        TradeDetailInfo tradeDetailInfo = TradeDetailInfo.fromTradeTable(tradeBoard);
        UserInfoResponse userInfo = userService.selectDetailUserInfo(tradeBoard.getUser().getId());
        return TradeDetailResponse.fromInfo(tradeDetailInfo, userInfo);
    }

    @Transactional(readOnly = true)
    @Override
    public List<TradeListResponse> selectListTrade(Long userId, TradeSearchRequest tradeSelectRequest) {
        return tradeSearchRepository.searchTrade(userId, tradeSelectRequest);
    }

    @Override
    public Boolean selectIsLiked(Long userId, Long tradeId) {
        return false;
    }
}
