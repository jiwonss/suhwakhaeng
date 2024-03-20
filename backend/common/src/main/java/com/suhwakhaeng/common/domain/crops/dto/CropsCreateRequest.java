package com.suhwakhaeng.common.domain.crops.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record CropsCreateRequest(
        String name,
        String category,
        String growingCondition,
        String diseaseType,
        String pestType,
        CultivationCharacteristicInfo cultivationCharacteristicInfo,

        List<ShippingTimeTableInfo> shippingTimeTableInfoList
) {

}
