package com.suhwakhaeng.common.domain.crops.dto;

import com.suhwakhaeng.common.domain.crops.entity.Crops;
import com.suhwakhaeng.common.domain.crops.entity.CropsVariety;

public record CropsVarietyCreateRequest(
        Long cropsId,
        CropsVarietyInfo cropsVarietyInfo
) {
    public CropsVariety toEntity(Crops crops) {
        return CropsVariety.builder()
                .crops(crops)
                .name(cropsVarietyInfo.getName())
                .category(cropsVarietyInfo.getCategory())
                .usage(cropsVarietyInfo.getUsage())
                .function(cropsVarietyInfo.getFunction())
                .characteristic(cropsVarietyInfo.getCharacteristic())
                .adaptationArea(cropsVarietyInfo.getAdaptationArea())
                .caution(cropsVarietyInfo.getCaution())
                .image(cropsVarietyInfo.getImage())
                .build();
    }
}
