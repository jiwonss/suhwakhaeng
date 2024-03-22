package com.suhwakhaeng.common.domain.crops.service;

import com.suhwakhaeng.common.domain.crops.dto.CropsCreateRequest;
import com.suhwakhaeng.common.domain.crops.dto.CropsListResponse;
import com.suhwakhaeng.common.domain.crops.dto.CropsVarietyCreateRequest;
import com.suhwakhaeng.common.domain.crops.dto.CropsVarietyListResponse;

import java.util.List;

public interface CropsService {

    void createCrops(CropsCreateRequest cropsCreateRequest);
    void createCropsVariety(CropsVarietyCreateRequest cropsVarietyCreateRequest);
    List<CropsListResponse> selectListCrops(String keyword);
    List<CropsVarietyListResponse> selectListCropsVariety(Long cropsId);

}
