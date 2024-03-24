package com.suhwakhaeng.common.domain.crops.service;

import com.suhwakhaeng.common.domain.crops.dto.*;

import java.util.List;

public interface CropsService {

    void createCrops(CropsCreateRequest cropsCreateRequest);
    void createCropsVariety(CropsVarietyCreateRequest cropsVarietyCreateRequest);
    List<CropsListResponse> selectListCrops(String keyword);
    List<CropsVarietyListResponse> selectListCropsVariety(Long cropsId);
    CropsDetailResponse selectDetailCrops(Long cropsId, Long cropsVarietyId);

}
