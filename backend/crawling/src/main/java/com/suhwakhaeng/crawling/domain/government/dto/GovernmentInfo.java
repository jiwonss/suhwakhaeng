package com.suhwakhaeng.crawling.domain.government.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GovernmentInfo {
    private Long governmentId;
    private String title;
    private String url;
    private String area;
    private LocalDate createdAt;
}
