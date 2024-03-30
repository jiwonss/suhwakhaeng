package com.suhwakhaeng.crawling.global.config;

import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import java.io.IOException;

@Configuration
@RequiredArgsConstructor
public class WebDriverConfig {
    private final ResourceLoader resourceLoader;

    private static String WEB_DRIVER_ID = "webdriver.chrome.driver";    //property 키

    // yml 파일로 빼기
    private static String WEB_DRIVER_PATH = "chromedriver-win64/chromedriver.exe";

    @Bean
    public WebDriver webDriver() {
        // chromedriver 실행 파일의 절대 경로를 가져옵니다.
        String absolutePath = getChromedriverAbsolutePath();

        // 시스템 프로퍼티를 설정합니다.
        System.setProperty(WEB_DRIVER_ID, absolutePath);

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized");
        options.addArguments("--disable-popup-blocking"); // 팝업 무시
        options.addArguments("headless"); // 창이 없이 프로세스 사용

        return new ChromeDriver(options);
    }

    private String getChromedriverAbsolutePath() {
        try {
            // chromedriver 파일의 Resource를 가져옴
            Resource resource = resourceLoader.getResource("classpath:" + WEB_DRIVER_PATH);

            // 절대 경로를 반환
            return resource.getFile().getAbsolutePath();
        } catch (IOException e) {
            e.printStackTrace();
            // 예외 발생 시 null 또는 예외 처리
            return null;
        }
    }

    @PreDestroy
    public void closeWebDriver() {
        webDriver().quit();
    }
}
