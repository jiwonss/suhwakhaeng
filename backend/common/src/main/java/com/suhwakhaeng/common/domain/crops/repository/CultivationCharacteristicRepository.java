package com.suhwakhaeng.common.domain.crops.repository;

import com.suhwakhaeng.common.domain.crops.entity.CultivationCharacteristic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CultivationCharacteristicRepository extends JpaRepository<CultivationCharacteristic, Long> {

    Optional<CultivationCharacteristic> findByCropsId(Long cropsId);

}
