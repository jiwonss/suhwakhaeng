package com.suhwakhaeng.common.domain.mycrops.dto;

import com.suhwakhaeng.common.domain.mycrops.enums.AreaUnit;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MyCropsDetailResponse {
    private Long myCropsId;
    private String myCropsName;
    private String cropsName;
    private String cropsVarietyName;
    private LocationInfo location;
    private double area;
    private String areaUnit;
    private int yield;

    public MyCropsDetailResponse(Long myCropsId, String myCropsName, String cropsName, String cropsVarietyName, String sido, String gugun, String dong, double area, AreaUnit areaUnit, int yield) {
        this.myCropsId = myCropsId;
        this.myCropsName = myCropsName;
        this.cropsName = cropsName;
        this.cropsVarietyName = cropsVarietyName;
        this.location = new LocationInfo(sido, gugun, dong);
        this.area = area;
        this.areaUnit = areaUnit.getName();
        this.yield = yield;
    }
}
