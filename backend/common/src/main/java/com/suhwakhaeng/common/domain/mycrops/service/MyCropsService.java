package com.suhwakhaeng.common.domain.mycrops.service;

import com.suhwakhaeng.common.domain.mycrops.entity.MyCrops;

public interface MyCropsService {
    Long createMyCrops(Long userId, Long cropsId, MyCrops myCrops);
}
