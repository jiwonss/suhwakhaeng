package com.suhwakhaeng.common.domain.mycrops.service;

import com.suhwakhaeng.common.domain.mycrops.dto.MyCropsResponse;
import com.suhwakhaeng.common.domain.mycrops.entity.MyCrops;

import java.util.List;

public interface MyCropsService {
    Long createMyCrops(Long userId, Long cropsId, MyCrops myCrops);

    List<MyCropsResponse> selectMyCrops(Long userId);

}
