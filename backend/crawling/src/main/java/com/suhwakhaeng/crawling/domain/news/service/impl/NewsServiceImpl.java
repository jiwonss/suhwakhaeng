package com.suhwakhaeng.crawling.domain.news.service.impl;

import com.suhwakhaeng.crawling.domain.news.dto.NewsResponse;
import com.suhwakhaeng.crawling.domain.news.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NewsServiceImpl implements NewsService {
    private final WebDriver webDriver;

    // TODO 추후에 크롤링은 스케줄러 걸고 크롤링해와서 캐시에 저장, 조회 api는 캐시에서 조회되도록 처리하면 성능 개선할 수 있지않을까?
    @Override
    public List<NewsResponse> selectNews() {
        String targetUrl = "https://search.naver.com/search.naver?where=news&query=%EB%B3%91%EC%B6%A9%ED%95%B4&sm=tab_opt&sort=0&photo=0&field=0&pd=0&ds=&de=&docid=&related=0&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so%3Ar%2Cp%3Aall&is_sug_officeid=0&office_category=0&service_area=0";
        List<NewsResponse> results = new ArrayList<>();

        webDriver.get(targetUrl);
        WebDriverWait wait = new WebDriverWait(webDriver, Duration.ofSeconds(30));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("list_news")));
        WebElement listNews = webDriver.findElement(By.className("list_news"));

        List<WebElement> elements = listNews.findElements(By.tagName("li"));
        for (int i = 0; i < 10; i++) {
            try {
                System.out.println(i + "번째 뉴스 크롤링");
                WebElement element = elements.get(i);

                WebElement newsContentsElement = element.findElement(By.className("news_contents"));

                // 없을 수 있다.
                String newsThumb = "";

                List<WebElement> dscThumbElements = newsContentsElement.findElements(By.className("dsc_thumb"));
                if (!dscThumbElements.isEmpty()) {
                    WebElement thumbElement = dscThumbElements.get(0).findElement(By.className("thumb"));
                    newsThumb = thumbElement.getAttribute("src");

//                    if (!isThumbnail(newsThumb)) {
//                        newsThumb = "";
//                    }
                }

                WebElement newsTitElement = newsContentsElement.findElement(By.className("news_tit"));

                String newsDetailUrl = newsTitElement.getAttribute("href");
                String title = newsTitElement.getAttribute("title");

                WebElement newsDescElement = newsContentsElement.findElement(By.className("news_dsc"));
                WebElement dscWrapElement = newsDescElement.findElement(By.className("dsc_wrap"));
                WebElement aElement = dscWrapElement.findElement(By.tagName("a"));
                String content = aElement.getText();

                NewsResponse result = NewsResponse.builder()
                        .title(title)
                        .content(content)
                        .thumbnail(newsThumb)
                        .url(newsDetailUrl)
                        .build();

                results.add(result);
            } catch (NoSuchElementException e) {
                e.printStackTrace();
            }
        }

        return results;
    }

    private static boolean isThumbnail(String newsThumb) {
        return newsThumb.startsWith("https") || newsThumb.startsWith("http");
    }
}
