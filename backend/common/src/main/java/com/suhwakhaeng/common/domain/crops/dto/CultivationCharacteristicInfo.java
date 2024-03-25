package com.suhwakhaeng.common.domain.crops.dto;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CultivationCharacteristicInfo {

    private Long id;
    private String scientificName;
    private String classification;
    private String physiologicalCharacteristic;
    private String mainTech;

}
