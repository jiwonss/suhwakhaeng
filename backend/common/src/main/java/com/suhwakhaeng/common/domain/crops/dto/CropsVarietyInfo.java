package com.suhwakhaeng.common.domain.crops.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class CropsVarietyInfo {

    private String name;
    private String category;
    private String usage;
    private String function;
    private String characteristic;
    private String adaptationArea;
    private String caution;
    private String image;

}
