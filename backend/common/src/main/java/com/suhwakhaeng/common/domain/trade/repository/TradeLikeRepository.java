package com.suhwakhaeng.common.domain.trade.repository;

import com.suhwakhaeng.common.domain.trade.entity.TradeLike;
import com.suhwakhaeng.common.domain.trade.entity.TradeLikePK;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TradeLikeRepository extends JpaRepository<TradeLike, Long> {
    boolean existsTradeLikeByTradeLikePK(TradeLikePK tradeLikePK);
}
