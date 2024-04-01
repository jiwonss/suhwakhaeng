package com.suhwakhaeng.crawling.domain.government.controller;

import com.suhwakhaeng.crawling.domain.government.dto.GovernmentSearchRequest;
import com.suhwakhaeng.crawling.domain.government.service.GovernmentService;
import com.suhwakhaeng.crawling.global.common.annotation.CustomPreAuthorize;
import com.suhwakhaeng.crawling.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/government")
public class GovernmentController {
    private final GovernmentService governmentService;

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @GetMapping
    public ResponseEntity selectGovernment(GovernmentSearchRequest request,
                                           @RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok().body(Message.success(governmentService.selectGovernment(request, PageRequest.of(page, size))));
    }
}
