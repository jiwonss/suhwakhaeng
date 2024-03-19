package com.suhwakhaeng.common.domain.crops.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class CultivationCharacteristicInfo {

    String scientificName;
    String classification;
    String physiologicalCharacteristic;
    String mainTech;

}
