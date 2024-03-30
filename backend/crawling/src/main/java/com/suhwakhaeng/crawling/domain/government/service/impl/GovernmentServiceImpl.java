package com.suhwakhaeng.crawling.domain.government.service.impl;

import com.suhwakhaeng.crawling.domain.government.repository.GovernmentRepository;
import com.suhwakhaeng.crawling.domain.government.service.CrawlingService;
import com.suhwakhaeng.crawling.domain.government.service.GovernmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class GovernmentServiceImpl implements GovernmentService {
    private final CrawlingService crawlingService;

    @Override
    @Scheduled(cron = "30 56 21 * * *")
    public void crawlingGovernment() {
        long startTime = System.currentTimeMillis();
        crawlingService.doWonjuCrawling();
        crawlingService.doYangyangCrawling();
        crawlingService.doNajuCrawling();
        crawlingService.doGoyangCrawling();
        long endTime = System.currentTimeMillis();
        long executionTime = endTime - startTime;

        System.out.println("크롤링 완료 : " + executionTime);
    }
}
