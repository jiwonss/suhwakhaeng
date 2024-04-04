package com.suhwakhaeng.common.domain.trade.dto;

import com.suhwakhaeng.common.domain.trade.entity.TradeBoard;
import com.suhwakhaeng.common.domain.trade.enums.TradeCate;
import com.suhwakhaeng.common.domain.trade.enums.TradeStatus;
import com.suhwakhaeng.common.global.common.entity.AxisLocation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Builder
@Getter
@Setter
public class TradeDetailInfo {
    private Long id;
    private String title;
    private String content;
    private String image1;
    private String image2;
    private String image3;
    private String image4;
    private TradeStatus status;
    private Long price;
    private TradeCate cate;
    private AxisLocation axisLocation;

    public static TradeDetailInfo fromTradeTable(TradeBoard tradeBoard) {
        return TradeDetailInfo.builder()
                .id(tradeBoard.getId())
                .title(tradeBoard.getTitle())
                .content(tradeBoard.getContent())
                .image1(tradeBoard.getImage1())
                .image2(tradeBoard.getImage2())
                .image3(tradeBoard.getImage3())
                .image4(tradeBoard.getImage4())
                .status(tradeBoard.getStatus())
                .price(tradeBoard.getPrice())
                .cate(tradeBoard.getCate())
                .axisLocation(tradeBoard.getAxisLocation())
                .build();
    }
}
