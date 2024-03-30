package com.suhwakhaeng.chat.controller;

import com.suhwakhaeng.chat.service.impl.ChatServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TestController {

    private final ChatServiceImpl chatService;

    @GetMapping(value = "/test/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Long test(@PathVariable Long userId) {
        return chatService.getUserInfo(userId);
    }

}
