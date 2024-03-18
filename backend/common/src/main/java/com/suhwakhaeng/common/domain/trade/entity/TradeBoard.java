package com.suhwakhaeng.common.domain.trade.entity;

import com.suhwakhaeng.common.domain.trade.enums.TradeCate;
import com.suhwakhaeng.common.domain.trade.enums.TradeStatus;
import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.global.common.entity.AxisLocation;
import com.suhwakhaeng.common.global.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
public class TradeBoard extends BaseEntity {
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "trade_board_id")
    @Id
    private Long id;

    @ManyToOne(fetch = LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "trade_board_title")
    private String title;

    @Column(name = "trade_board_content")
    private String content;

    @Column(name = "trade_board_image1")
    private String image1;

    @Column(name = "trade_board_image2")
    private String image2;

    @Column(name = "trade_board_image3")
    private String image3;

    @Column(name = "trade_board_image4")
    private String image4;

    @Column(name = "trade_board_price")
    private Long price;

    @Column(name = "trade_cate")
    @Enumerated(EnumType.STRING)
    private TradeCate cate;

    @Embedded
    private AxisLocation axisLocation;

    @Column(name = "trade_status")
    @Enumerated(EnumType.STRING)
    private TradeStatus status;
}
