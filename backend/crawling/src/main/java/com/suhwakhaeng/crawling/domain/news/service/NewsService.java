package com.suhwakhaeng.crawling.domain.news.service;

import com.suhwakhaeng.crawling.domain.news.dto.NewsResponse;

import java.util.List;

public interface NewsService {
    List<NewsResponse> selectNews();
}
