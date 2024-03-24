package com.suhwakhaeng.common.domain.crops.dto;

import lombok.Builder;
import lombok.ToString;

@Builder
@ToString
public class CropsDetailResponse {

    private CropsInfo cropsInfo;
    private CultivationCharacteristicInfo cultivationCharacteristicInfo;
    private TableInfo tableInfo;
    private CropsVarietyInfo cropsVarietyInfo;

}
