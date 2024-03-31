package com.suhwakhaeng.crawling.domain.news.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewsResponse {
    private PublisherInfo publisher;

    private String title;
    private String content;
    private String thumbnail;
    private String url;
}
