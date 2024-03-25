package com.suhwakhaeng.common.domain.mycrops.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LocationInfo {
    private String sido;
    private String gugun;
    private String dong;

}
