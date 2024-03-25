package com.suhwakhaeng.common.domain.mycrops.service;

import com.suhwakhaeng.common.domain.mycrops.dto.MyCropsRequest;
import com.suhwakhaeng.common.domain.mycrops.dto.MyCropsResponse;
import com.suhwakhaeng.common.domain.mycrops.dto.MyCropsSimpleResponse;
import com.suhwakhaeng.common.domain.mycrops.entity.MyCrops;

import java.util.List;

public interface MyCropsService {
    Long createMyCrops(Long userId, MyCropsRequest myCropsRequest);

    List<MyCropsResponse> selectMyCrops(Long userId);

    List<MyCropsSimpleResponse> selectMyCropsSimple(Long userId);

    MyCrops selectMyCrop(Long myCropsId);
}
