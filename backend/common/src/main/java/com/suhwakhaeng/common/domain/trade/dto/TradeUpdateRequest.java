package com.suhwakhaeng.common.domain.trade.dto;

import com.suhwakhaeng.common.domain.trade.entity.TradeBoard;
import com.suhwakhaeng.common.domain.trade.enums.TradeCate;
import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.global.common.entity.AxisLocation;
import lombok.Builder;

@Builder
public record TradeUpdateRequest(
    TradeCate cate,
    String title,
    Long price,
    String content,
    String image1,
    String image2,
    String image3,
    String image4,
    Double x,
    Double y,
    String roadNameAddress
){ }
