package com.suhwakhaeng.crawling.domain.news.service.impl;

import com.suhwakhaeng.crawling.domain.news.dto.NewsResponse;
import com.suhwakhaeng.crawling.domain.news.dto.PublisherInfo;
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
                WebElement element = elements.get(i);
                WebElement newsInfoElement = element.findElement(By.className("news_info"));
                WebElement infoGroupElement = newsInfoElement.findElement(By.className("info_group"));
                WebElement infoPressElement = infoGroupElement.findElement(By.cssSelector(".info.press"));

                String publisherName = infoPressElement.getText();

                // "언론사 선정" 붙는 경우
                if (!infoPressElement.findElements(By.tagName("i")).isEmpty()) {
                    String attachmentName = infoPressElement.findElement(By.tagName("i")).getText();
                    publisherName = publisherName.replace(attachmentName, "");
                }


                WebElement newsInfoThumbElement = infoPressElement.findElement(By.className("thumb"));
                String newsInfoThumb = newsInfoThumbElement.getAttribute("src");

                WebElement spanElement = infoGroupElement.findElement(By.cssSelector("span.info"));

                String publisherDate = spanElement.getText();

                PublisherInfo publisher = PublisherInfo.builder()
                        .name(publisherName)
                        .thumbnail(newsInfoThumb)
                        .date(publisherDate)
                        .build();

//            news_contents >> 해당 뉴스 관련 내용
                WebElement newsContentsElement = element.findElement(By.className("news_contents"));

                WebElement dscThumbElement = newsContentsElement.findElement(By.className("dsc_thumb"));

                WebElement thumbElement = dscThumbElement.findElement(By.className("thumb"));
                String newsThumb = thumbElement.getAttribute("src");

                WebElement newsTitElement = newsContentsElement.findElement(By.className("news_tit"));

                String newsDetailUrl = newsTitElement.getAttribute("href");
                String title = newsTitElement.getAttribute("title");

                WebElement newsDescElement = newsContentsElement.findElement(By.className("news_dsc"));
                WebElement dscWrapElement = newsDescElement.findElement(By.className("dsc_wrap"));
                WebElement aElement = dscWrapElement.findElement(By.tagName("a"));
                String content = aElement.getText();

                NewsResponse result = NewsResponse.builder()
                        .publisher(publisher)
                        .title(title)
                        .content(content)
                        .thumbnail(newsThumb)
                        .url(newsDetailUrl)
                        .build();

                results.add(result);
            } catch (NoSuchElementException e) {
                break;
            }
        }

        return results;
    }
}
