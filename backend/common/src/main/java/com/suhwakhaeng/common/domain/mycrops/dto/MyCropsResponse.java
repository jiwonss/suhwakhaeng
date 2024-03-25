package com.suhwakhaeng.common.domain.mycrops.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MyCropsResponse {
    private Long myCropsId;
    private String myCropsName;
    private String cropsName;
    private String cropsVarietyName;
    private LocationInfo location;

    public MyCropsResponse(Long myCropsId, String myCropsName, String cropsName, String cropsVarietyName, String sido, String gugun, String dong) {
        this.myCropsId = myCropsId;
        this.myCropsName = myCropsName;
        this.cropsName = cropsName;
        this.cropsVarietyName = cropsVarietyName;
        this.location = LocationInfo.builder()
                .sido(sido)
                .gugun(gugun)
                .dong(dong)
                .build();
    }

}
