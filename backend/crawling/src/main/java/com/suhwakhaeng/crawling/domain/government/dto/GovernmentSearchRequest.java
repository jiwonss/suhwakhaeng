package com.suhwakhaeng.crawling.domain.government.dto;

import java.time.LocalDate;

public record GovernmentSearchRequest(
        String keyword,
        String area
) {
}
