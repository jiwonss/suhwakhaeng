package com.suhwakhaeng.apigateway.test;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RefreshScope
public class TestController {

    @Value("${message}")
    private String test;

    @GetMapping("/test")
    public String test() {
        return test;
    }

}
