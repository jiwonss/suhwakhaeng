package com.suhwakhaeng.common.domain.crops.dto;

import com.suhwakhaeng.common.domain.crops.entity.CultivationCharacteristic;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class CultivationCharacteristicInfo {

    private String scientificName;
    private String classification;
    private String physiologicalCharacteristic;
    private String mainTech;

    public static CultivationCharacteristicInfo fromCultivationCharacteristic(CultivationCharacteristic cultivationCharacteristic) {
        return CultivationCharacteristicInfo.builder()
                .scientificName(cultivationCharacteristic.getScientificName())
                .classification(cultivationCharacteristic.getClassification())
                .physiologicalCharacteristic(cultivationCharacteristic.getPhysiologicalCharacteristic())
                .mainTech(cultivationCharacteristic.getMainTech())
                .build();
    }

}
