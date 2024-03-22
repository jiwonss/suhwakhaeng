package com.suhwakhaeng.common.domain.crops.dto;

import com.suhwakhaeng.common.domain.crops.entity.CropsVariety;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CropsVarietyResponse {

    private Long cropId;
    private Long cropsVarietyId;
    private String cropsVarietyName;

    public static CropsVarietyResponse from(CropsVariety cropsVariety) {
        return CropsVarietyResponse.builder()
                .cropId(cropsVariety.getCrops().getId())
                .cropsVarietyId(cropsVariety.getId())
                .cropsVarietyName(cropsVariety.getName())
                .build();
    }

}
