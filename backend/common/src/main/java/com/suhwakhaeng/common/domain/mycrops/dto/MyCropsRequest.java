package com.suhwakhaeng.common.domain.mycrops.dto;

import com.suhwakhaeng.common.domain.mycrops.entity.MyCrops;
import com.suhwakhaeng.common.domain.mycrops.enums.AreaUnit;
import com.suhwakhaeng.common.global.common.entity.Location;

public record MyCropsRequest(
        Long cropsId,
        Boolean isCultivated,
        Location location,
        double area,
        String areaUnit,
        int yield
) {

    public record Location(String sido, String gugun, String dong) {

    }

    public MyCrops toEntity() {
        AreaUnit unit = AreaUnit.fromName(areaUnit);
        return MyCrops.builder()
                .isCultivated(isCultivated)
                .sido(location().sido)
                .gugun(location().gugun)
                .dong(location().dong)
                .area(unit.getSquareM(area))
                .areaUnit(unit)
                .yield(yield)
                .build();
    }
}
