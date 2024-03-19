package com.suhwakhaeng.common.domain.trade.repository;

import com.suhwakhaeng.common.domain.trade.entity.TradeBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TradeRepository extends JpaRepository<TradeBoard, Long> {
    Optional<TradeBoard> findTradeBoardById(Long id);
}
