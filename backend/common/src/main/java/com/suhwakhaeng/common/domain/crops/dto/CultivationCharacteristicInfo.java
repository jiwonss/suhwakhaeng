package com.suhwakhaeng.common.domain.crops.dto;

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

}
