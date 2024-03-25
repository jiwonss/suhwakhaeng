package com.suhwakhaeng.common.domain.crops.repository;

import com.suhwakhaeng.common.domain.crops.dto.CropsDetailResponse;

import java.util.List;

public interface CropsDetailRepository {

    CropsDetailResponse selectDetailCrops(Long cropsId, Long cropsVarietyId);
    List<String> selectDetailCropsShippingTimeTable(int rowIdx, int columnCnt, Long shippingTimeTableId);

}
