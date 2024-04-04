package com.suhwakhaeng.common.domain.crops.repository;

import com.suhwakhaeng.common.domain.crops.entity.ShippingTimeTable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShippingTimeTableRepository extends JpaRepository<ShippingTimeTable, Long> {
    Optional<ShippingTimeTable> findByCropsId(Long cropsId);

}
