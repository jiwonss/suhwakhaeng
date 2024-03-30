package com.suhwakhaeng.crawling.domain.government.service.impl;

import com.suhwakhaeng.crawling.domain.government.repository.GovernmentRepository;
import com.suhwakhaeng.crawling.domain.government.service.GovernmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class GovernmentServiceImpl implements GovernmentService {
    private final GovernmentRepository governmentRepository;

}
