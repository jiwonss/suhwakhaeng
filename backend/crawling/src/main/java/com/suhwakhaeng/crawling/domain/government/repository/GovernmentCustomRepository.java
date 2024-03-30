package com.suhwakhaeng.crawling.domain.government.repository;

import com.suhwakhaeng.crawling.domain.government.dto.GovernmentSearchRequest;
import com.suhwakhaeng.crawling.domain.government.dto.GovernmentSliceResponse;
import org.springframework.data.domain.Pageable;


public interface GovernmentCustomRepository {
    GovernmentSliceResponse selectGovernment(GovernmentSearchRequest request, Pageable pageable);
}
