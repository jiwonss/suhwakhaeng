package com.suhwakhaeng.common.domain.crops.dto;

import com.suhwakhaeng.common.domain.crops.enums.CropsCate;
import lombok.*;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CropsInfo {

    private Long id;
    private String name;
    private CropsCate category;
    private String growingCondition;
    private String diseaseType;
    private String pestType;

}
