package com.suhwakhaeng.common.domain.crops.dto;

import com.suhwakhaeng.common.domain.crops.entity.Crops;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CropsListResponse {

    private Long cropsId;
    private String cropsName;

    public static CropsListResponse from(Crops crops) {
        return CropsListResponse.builder()
                .cropsId(crops.getId())
                .cropsName(crops.getName())
                .build();
    }

}
