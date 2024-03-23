package com.suhwakhaeng.common.domain.crops.dto;

import com.suhwakhaeng.common.domain.crops.entity.Crops;
import com.suhwakhaeng.common.domain.crops.entity.CultivationCharacteristic;
import com.suhwakhaeng.common.domain.crops.entity.ShippingTimeTable;
import com.suhwakhaeng.common.domain.crops.enums.CropsCate;
import lombok.Builder;

@Builder
public record CropsCreateRequest(
        String name,
        String category,
        String growingCondition,
        String diseaseType,
        String pestType,
        CultivationCharacteristicInfo cultivationCharacteristicInfo,
        ShippingTimeTableInfo shippingTimeTableInfo
) {
    public Crops toCropsEntity() {
        return Crops.builder()
                .name(name)
                .category(CropsCate.valueOf(category))
                .growingCondition(growingCondition)
                .diseaseType(diseaseType)
                .pestType(pestType)
                .build();
    }

    public CultivationCharacteristic toCultivationCharacteristicEntity(Crops crops) {
        return CultivationCharacteristic.builder()
                .crops(crops)
                .scientificName(cultivationCharacteristicInfo.getScientificName())
                .classification(cultivationCharacteristicInfo.getClassification())
                .physiologicalCharacteristic(cultivationCharacteristicInfo.getPhysiologicalCharacteristic())
                .mainTech(cultivationCharacteristicInfo.getMainTech())
                .build();
    }

    public ShippingTimeTable toShippingTimeTableEntity(Crops crops) {
        return ShippingTimeTable.builder()
                .crops(crops)
                .tableHead(shippingTimeTableInfo.getTableHead())
                .tableTitle(shippingTimeTableInfo.getTableTitle())
                .build();
    }

}
