package com.suhwakhaeng.common.domain.trade.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.suhwakhaeng.common.domain.trade.enums.TradeCate;
import com.suhwakhaeng.common.domain.trade.enums.TradeStatus;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record TradeListResponse (
    Long id,
    TradeCate cate,
    String image1,
    String title,
    LocalDateTime createdAt,
    Long price,
    TradeStatus status,
    Boolean isLiked,
    Long likeCnt
) { }
