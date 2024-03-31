package com.suhwakhaeng.common.domain.mycrops.dto;

import com.suhwakhaeng.common.domain.mycrops.entity.MyCrops;
import com.suhwakhaeng.common.domain.mycrops.enums.AreaUnit;

public record MyCropsCreateRequest(
        Long cropsVarietyId,
        LocationInfo location,
        String name,
        double area,
        String areaUnit,
        int yield
) {


    public MyCrops toEntity() {
        AreaUnit unit = AreaUnit.fromName(areaUnit);
        return MyCrops.builder()
                .sido(location().getSido())
                .gugun(location().getGugun())
                .dong(location().getDong())
                .name(name)
                .area(unit.getSquareM(area))
                .areaUnit(unit)
                .yield(yield)
                .build();
    }
}
