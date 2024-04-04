package com.suhwakhaeng.common.domain.crops.dto;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CropsDetailResponse {

    private CropsInfo cropsInfo;
    private CultivationCharacteristicInfo cultivationCharacteristicInfo;
    private TableInfo tableInfo;
    private CropsVarietyInfo cropsVarietyInfo;

    public void updateTableInfo(TableInfo tableInfo) {
        this.tableInfo = tableInfo;
    }

}
