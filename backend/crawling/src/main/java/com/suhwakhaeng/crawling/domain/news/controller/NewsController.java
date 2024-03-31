package com.suhwakhaeng.crawling.domain.news.controller;

import com.suhwakhaeng.crawling.domain.news.service.NewsService;
import com.suhwakhaeng.crawling.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/news")
public class NewsController {
    private final NewsService newsService;

    @GetMapping
    public ResponseEntity selectNews() {
        return ResponseEntity.ok().body(Message.success(newsService.selectNews()));
    }
}
