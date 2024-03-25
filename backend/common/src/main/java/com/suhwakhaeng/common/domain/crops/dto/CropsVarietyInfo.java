package com.suhwakhaeng.common.domain.crops.dto;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CropsVarietyInfo {

    private Long id;
    private String name;
    private String category;
    private String usage;
    private String function;
    private String characteristic;
    private String adaptationArea;
    private String caution;
    private String image;

}
