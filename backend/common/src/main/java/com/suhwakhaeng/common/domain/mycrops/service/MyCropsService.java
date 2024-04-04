package com.suhwakhaeng.common.domain.mycrops.service;

import com.suhwakhaeng.common.domain.mycrops.dto.*;
import com.suhwakhaeng.common.domain.mycrops.entity.MyCrops;

import java.util.List;

public interface MyCropsService {
    Long createMyCrops(Long userId, MyCropsCreateRequest myCropsCreateRequest);

    List<MyCropsResponse> selectMyCrops(Long userId);

    List<MyCropsSimpleResponse> selectMyCropsSimple(Long userId);

    MyCrops selectMyCrop(Long myCropsId);
    MyCropsDetailResponse selectMyCropsDetail(Long myCropsId);

    void deleteMyCrops(Long myCropsId);

    Long updateMyCrops(Long myCropsId, MyCropsUpdateRequest request);

}
