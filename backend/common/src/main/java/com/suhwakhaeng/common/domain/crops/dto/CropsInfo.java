package com.suhwakhaeng.common.domain.crops.dto;

import com.suhwakhaeng.common.domain.crops.entity.Crops;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class CropsInfo {

    private String name;
    private String category;
    private String growingCondition;
    private String diseaseType;
    private String pestType;

    public static CropsInfo fromCrops(Crops crops) {
        return CropsInfo.builder()
                .name(crops.getName())
                .category(crops.getCategory().toString())
                .growingCondition(crops.getGrowingCondition())
                .diseaseType(crops.getDiseaseType())
                .pestType(crops.getPestType())
                .build();
    }

}
