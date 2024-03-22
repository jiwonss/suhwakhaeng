package com.suhwakhaeng.common.domain.crops.dto;

import com.suhwakhaeng.common.domain.crops.entity.Crops;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CropsResponse {

    private Long cropsId;
    private String cropsName;

    public static CropsResponse from(Crops crops) {
        return CropsResponse.builder()
                .cropsId(crops.getId())
                .cropsName(crops.getName())
                .build();
    }

}
