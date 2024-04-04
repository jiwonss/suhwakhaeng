package com.suhwakhaeng.crawling.domain.government.service;

import com.suhwakhaeng.crawling.domain.government.dto.GovernmentSearchRequest;
import com.suhwakhaeng.crawling.domain.government.dto.GovernmentSliceResponse;
import org.springframework.data.domain.Pageable;

public interface GovernmentService {
    GovernmentSliceResponse selectGovernment(GovernmentSearchRequest request, Pageable pageable);

    void crawlingGovernment();
}
