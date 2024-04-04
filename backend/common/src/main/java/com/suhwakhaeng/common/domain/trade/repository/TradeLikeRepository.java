package com.suhwakhaeng.common.domain.trade.repository;

import com.suhwakhaeng.common.domain.trade.entity.TradeBoard;
import com.suhwakhaeng.common.domain.trade.entity.TradeLike;
import com.suhwakhaeng.common.domain.trade.entity.TradeLikePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;


public interface TradeLikeRepository extends JpaRepository<TradeLike, Long> {
    boolean existsTradeLikeByTradeLikePK(TradeLikePK tradeLikePK);

    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM TradeLike tl WHERE tl.tradeLikePK.tradeBoard.id = :tradeId")
    void deleteByTradeId(Long tradeId);
}
