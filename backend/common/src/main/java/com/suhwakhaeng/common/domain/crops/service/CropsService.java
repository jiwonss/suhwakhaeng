package com.suhwakhaeng.common.domain.crops.service;

import com.suhwakhaeng.common.domain.crops.dto.CropsCreateRequest;
import com.suhwakhaeng.common.domain.crops.dto.CropsVarietyCreateRequest;

public interface CropsService {

    void createCrops(CropsCreateRequest cropsCreateRequest);
    void createCropsVariety(CropsVarietyCreateRequest cropsVarietyCreateRequest);

}
