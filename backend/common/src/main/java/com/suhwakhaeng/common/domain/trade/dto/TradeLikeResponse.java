package com.suhwakhaeng.common.domain.trade.dto;

import lombok.Builder;

@Builder
public record TradeLikeResponse(
    boolean isLiked
) {}
