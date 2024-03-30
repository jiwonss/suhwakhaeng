package com.suhwakhaeng.crawling.domain.government.controller;

import com.suhwakhaeng.crawling.domain.government.service.GovernmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/government")
public class GovernmentController {
    private final GovernmentService governmentService;

}
