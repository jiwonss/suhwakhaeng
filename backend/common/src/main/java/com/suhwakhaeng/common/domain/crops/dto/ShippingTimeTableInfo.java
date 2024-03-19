package com.suhwakhaeng.common.domain.crops.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class ShippingTimeTableInfo {

    private String croppingTypeName;
    private int rowOrder;
    private int columnOrder;
    private String attr;
    private String value;

}
