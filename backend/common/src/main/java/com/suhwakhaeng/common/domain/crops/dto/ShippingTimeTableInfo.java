package com.suhwakhaeng.common.domain.crops.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@Builder
@ToString
public class ShippingTimeTableInfo {

    private String tableHead;
    private String tableTitle;
    private List<ShippingTimeTableValueInfo> shippingTimeTableValueInfoList;

}
