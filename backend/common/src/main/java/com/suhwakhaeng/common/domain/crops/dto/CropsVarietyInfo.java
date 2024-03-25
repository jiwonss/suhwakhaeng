package com.suhwakhaeng.common.domain.crops.dto;

import com.suhwakhaeng.common.domain.crops.entity.CropsVariety;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class CropsVarietyInfo {

    private String name;
    private String category;
    private String usage;
    private String function;
    private String characteristic;
    private String adaptationArea;
    private String caution;
    private String image;

    public static CropsVarietyInfo fromCropsVariety(CropsVariety cropsVariety) {
        return CropsVarietyInfo.builder()
                .name(cropsVariety.getName())
                .category(cropsVariety.getCategory())
                .usage(cropsVariety.getUsage())
                .function(cropsVariety.getFunction())
                .characteristic(cropsVariety.getCharacteristic())
                .adaptationArea(cropsVariety.getAdaptationArea())
                .caution(cropsVariety.getCaution())
                .image(cropsVariety.getImage())
                .build();
    }

}
