package com.suhwakhaeng.crawling.domain.government.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GovernmentSliceResponse {
    private Boolean hasNext;
    private List<GovernmentInfo> data = new ArrayList<>();
}
