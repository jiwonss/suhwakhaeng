package com.suhwakhaeng.common.domain.crops.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CropsListResponse {

    private Long id;
    private String name;

}
