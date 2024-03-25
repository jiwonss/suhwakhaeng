package com.suhwakhaeng.common.domain.mycrops.dto;

import com.suhwakhaeng.common.domain.mycrops.entity.MyCrops;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyCropsSimpleResponse {
    private Long myCropsId;
    private String myCropsName;

}
