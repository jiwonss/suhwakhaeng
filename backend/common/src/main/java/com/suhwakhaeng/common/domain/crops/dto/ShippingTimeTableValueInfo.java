package com.suhwakhaeng.common.domain.crops.dto;

import com.suhwakhaeng.common.domain.crops.entity.ShippingTimeTable;
import com.suhwakhaeng.common.domain.crops.entity.ShippingTimeTableValue;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class ShippingTimeTableValueInfo {

    private String croppingTypeName;
    private int rowOrder;
    private int columnOrder;
    private String value;

    public ShippingTimeTableValue toEntity(ShippingTimeTable shippingTimeTable) {
        return ShippingTimeTableValue.builder()
                .shippingTimeTable(shippingTimeTable)
                .croppingTypeName(croppingTypeName)
                .rowOrder(rowOrder)
                .columnOrder(columnOrder)
                .value(value)
                .build();
    }

}
