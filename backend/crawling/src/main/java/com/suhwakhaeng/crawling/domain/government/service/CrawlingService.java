package com.suhwakhaeng.crawling.domain.government.service;

import com.suhwakhaeng.crawling.domain.government.entity.Government;
import com.suhwakhaeng.crawling.domain.government.repository.GovernmentRepository;
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
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Transactional
@RequiredArgsConstructor
public class CrawlingService {
    private final WebDriver webDriver;
    private final GovernmentRepository governmentRepository;

    /**
     * 원주시 농업경영센터 공지사항 크롤링
     */
    public void doWonjuCrawling() {
        System.out.println("원주, 현재 스레드 이름: " + Thread.currentThread().getName());

        List<Government> list = new ArrayList<>();

        String baseUrl = "https://www.wonju.go.kr/wjatc/selectBbsNttList.do?bbsNo=48&&key=3489&pageUnit=10&searchCnd=all&pageIndex=";
        int curPage = 1;
        boolean isExist = false;

        while (true) {
            try {
                System.out.println("======================= 원주 curPage : " + curPage + "==============================");
                String targetUrl = baseUrl + curPage;

                webDriver.get(targetUrl);
                WebDriverWait wait = new WebDriverWait(webDriver, Duration.ofSeconds(30));
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("text_center")));
                WebElement centerElement = webDriver.findElement(By.className("text_center"));

                List<WebElement> elements = centerElement.findElements(By.tagName("tr"));
                for (WebElement element : elements) {
                    WebElement subjectElement = element.findElement(By.className("p-subject"));
                    WebElement aElement = subjectElement.findElement(By.tagName("a"));
                    WebElement dateElement = element.findElement(By.className("date"));
                    String dateString = dateElement.getText();

                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");

                    LocalDate date = LocalDate.parse(dateString, formatter);

                    String detailUrl = aElement.getAttribute("href");
                    String title = aElement.getText();

                    isExist = governmentRepository.existsByUrl(detailUrl);
                    if (isExist || curPage == 10) {
                        break;
                    }

                    Government government = Government.builder()
                            .title(title)
                            .url(detailUrl)
                            .area("원주")
                            .date(date)
                            .build();

                    list.add(government);
                }

            } catch (NoSuchElementException e) {
                break;
            }

            if (isExist || curPage == 10) {
                break;
            }
            curPage++;
        }

        governmentRepository.saveAll(list);
    }


    /**
     * 양양시 농업경영센터 공지사항 크롤링
     */
    public void doYangyangCrawling() {
        long startTime = System.currentTimeMillis();
        String threadName = Thread.currentThread().getName();
        System.out.println("양양, 현재 스레드 이름: " + threadName);
        List<Government> list = new ArrayList<>();

        String url = "https://www.yangyang.go.kr/gw/agriculture/notiyard_agrnotice?mode=listForm&searchFieldTitle=%EB%86%8D%EC%97%85&boardCode=TBDDDAA03&curPage=";
        int curPage = 1;
        boolean isExist = false;

        while (true) {
            try {
                // 상세 게시판 정보
                String targetUrl = url + curPage + "#a";
                System.out.println("======================= 양양 curPage : " + curPage + "==============================");

                String baseUrl = "https://www.yangyang.go.kr/gw/agriculture/notiyard_agrnotice?mode=readForm&boardCode=TBDDDAA03&curPage=1&searchFieldContent=&searchFieldName=&searchFieldTitle=%EB%86%8D%EC%97%85&searchFieldETC=&articleSeq=";

                webDriver.get(targetUrl);
                WebDriverWait wait = new WebDriverWait(webDriver, Duration.ofSeconds(30));
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("skinTxa-center")));
                WebElement centerElement = webDriver.findElement(By.className("skinTxa-center"));

                List<WebElement> elements = centerElement.findElements(By.tagName("tr"));

                for (WebElement element : elements) {
                    WebElement dateElement = element.findElement(By.className("skinTb-date"));
                    String dateString = dateElement.getText();
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

                    LocalDate date = LocalDate.parse(dateString, formatter);

                    WebElement sbjElement = element.findElement(By.className("skinTb-sbj"));

                    WebElement aElement = sbjElement.findElement(By.tagName("a"));
                    String title = aElement.getAttribute("title");
                    String onclick = aElement.getAttribute("onclick");


                    Pattern pattern = Pattern.compile("\\('(\\d+)'\\)");
                    Matcher matcher = pattern.matcher(onclick);
                    String detailUrl = null;

                    if (matcher.find()) {
                        String articleNumber = matcher.group(1);
                        detailUrl = baseUrl + articleNumber;

                        isExist = governmentRepository.existsByUrl(detailUrl);

                    } else {
                        detailUrl = baseUrl;
                    }

                    if (isExist) {
                        break;
                    }

                    Government government = Government.builder()
                            .title(title)
                            .url(detailUrl)
                            .area("양양")
                            .date(date)
                            .build();

                    list.add(government);
                }
            } catch (NoSuchElementException e) {
                e.printStackTrace();
                System.out.println(e.getClass());
                break;
            }

            if (isExist) {
                break;
            }
            curPage++;

        }

        governmentRepository.saveAll(list);
        long endTime = System.currentTimeMillis();
        long executionTime = endTime - startTime;
        System.out.println("양양 완료 : " + executionTime);
    }

    /**
     * 나주시 농업경영센터 공지사항 크롤링
     */
    public void doNajuCrawling() {
        System.out.println("나주, 현재 스레드 이름: " + Thread.currentThread().getName());

        String baseUrl = "https://www.naju.go.kr/atec/information/notice?page=";

        List<Government> list = new ArrayList<>();
        int curPage = 1;
        boolean isExist = false;

        while (true) {
            try {
                System.out.println("======================= 나주 curPage : " + curPage + "==============================");
                String targetUrl = baseUrl + curPage;

                webDriver.get(targetUrl);
                WebDriverWait wait = new WebDriverWait(webDriver, Duration.ofSeconds(30));
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("board_basic")));
                WebElement baordElement = webDriver.findElement(By.className("board_basic"));
                WebElement bodyElement = baordElement.findElement(By.tagName("tbody"));

                List<WebElement> elements = bodyElement.findElements(By.tagName("tr"));

                for (WebElement element : elements) {

                    List<WebElement> tdElements = element.findElements(By.tagName("td"));

                    WebElement dateElement = tdElements.get(3);

                    // XPath를 사용하여 해당하는 td 요소를 찾음
//                    WebElement dateElement = element.findElement(By.xpath(".//td[contains(text(), 'yyyy-mm-dd')]"));
//                    WebElement dateElement = element.findElement(By.xpath(".//td[contains(@class, 'align_left')]/following-sibling::td[1]"));

                    // 찾은 요소의 텍스트 출력
                    String dateString = dateElement.getText();

                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                    LocalDate date = LocalDate.parse(dateString, formatter);

                    WebElement basicElement = element.findElement(By.className("basic_cont"));
                    String detailUrl = basicElement.getAttribute("href");
                    String title = basicElement.getAttribute("title");

                    isExist = governmentRepository.existsByUrl(detailUrl);
                    if (isExist || curPage == 10) {
                        break;
                    }

                    Government government = Government.builder()
                            .title(title)
                            .url(detailUrl)
                            .area("나주")
                            .date(date)
                            .build();

                    list.add(government);
                }

            } catch (NoSuchElementException e) {
                e.printStackTrace();
                break;
            }

            if (isExist || curPage == 10) {
                break;
            }
            curPage++;
        }

        governmentRepository.saveAll(list);
    }

    /**
     * 고양시 농업경영센터 공지사항 크롤링
     */
    public void doGoyangCrawling() {
        long startTime = System.currentTimeMillis();
        String baseUrl = "https://www.goyang.go.kr/agr/user/bbs/BD_selectBbsList.do?q_bbsCode=1064&q_currPage=";
        String laterUrl = "&q_pClCode=&q_clCode=&q_clNm=&q_searchKey=1000&q_searchVal=";
        List<Government> list = new ArrayList<>();
        String detailBaseUrl = "https://www.goyang.go.kr/agr/user/bbs/BD_selectBbs.do?q_bbsCode=";
        String detailMidleUrl = "&q_bbscttSn=";

        int curPage = 1;
        boolean isExist = false;

        while (curPage <= 10) {
            try {
                System.out.println("======================= 고양 curPage : " + curPage + "==============================");
                String targetUrl = baseUrl + curPage + laterUrl;

                webDriver.get(targetUrl);
                WebDriverWait wait = new WebDriverWait(webDriver, Duration.ofSeconds(30));

                wait.until(ExpectedConditions.visibilityOfElementLocated(By.tagName("tbody")));
                WebElement tbodyElement = webDriver.findElement(By.tagName("tbody"));

                List<WebElement> elements = tbodyElement.findElements(By.tagName("tr"));

                for (WebElement element : elements) {
                    WebElement td = element.findElement(By.tagName("td"));
                    String type = td.getText();
                    if ("공지".equals(type)) {
                        continue;
                    }

                    WebElement dateElement = element.findElement(By.className("date"));
                    String dateString = dateElement.getText();

                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
                    LocalDate date = LocalDate.parse(dateString, formatter);

                    WebElement subject = element.findElement(By.className("subject"));
                    WebElement aTag = subject.findElement(By.tagName("a"));

                    String title = aTag.getText();

                    // onclick 속성의 값을 가져옴
                    String onclickValue = aTag.getAttribute("onclick");

                    // 정규표현식을 사용하여 '1064'와 '20240326170933690' 값을 추출
                    Pattern pattern = Pattern.compile("fnView\\('(\\d+)'\\s*,\\s*'([\\d]+)'");
                    Matcher matcher = pattern.matcher(onclickValue);
                    if (matcher.find()) {
                        String q_bbsCode = matcher.group(1);
                        String q_bbscttSn = matcher.group(2);

                        String detailUrl = detailBaseUrl + q_bbsCode + detailMidleUrl + q_bbscttSn;

                        isExist = governmentRepository.existsByUrl(detailUrl);

                        if (isExist) {
                            break;
                        }

                        Government government = Government.builder()
                                .title(title)
                                .url(detailUrl)
                                .area("고양")
                                .date(date)
                                .build();

                        list.add(government);
                    }

                }


            } catch (NoSuchElementException e) {
                break;
            }

            if (isExist) {
                break;
            }

            curPage++;
        }

        governmentRepository.saveAll(list);
    }
}
