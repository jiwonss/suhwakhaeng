package com.suhwakhaeng.common.domain.crops.repository;

import com.suhwakhaeng.common.domain.crops.entity.CropsVariety;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CropsVarietyRepository extends JpaRepository<CropsVariety, Long> {

    List<CropsVariety> findAllByCropsIdOrderByNameAsc(Long cropsId);

}
