package com.suhwakhaeng.common.domain.trade.dto;

import com.suhwakhaeng.common.domain.trade.entity.TradeBoard;
import com.suhwakhaeng.common.domain.trade.enums.TradeCate;
import com.suhwakhaeng.common.domain.trade.enums.TradeStatus;
import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.global.common.entity.AxisLocation;
import lombok.Builder;

@Builder
public record TradeCreateRequest(
    String cate,
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
){
    public TradeBoard toEntity(Long userId) {
        return TradeBoard.builder()
                .cate(TradeCate.valueOf(cate))
                .title(title)
                .price(price)
                .user(User.builder().id(userId).build())
                .content(content)
                .image1(image1)
                .image2(image2)
                .image3(image3)
                .image4(image4)
                .axisLocation(AxisLocation.builder()
                        .x(x)
                        .y(y)
                        .roadNameAddress(roadNameAddress)
                        .build()
                )
                .status(TradeStatus.SALE)
                .build();
    }
}
