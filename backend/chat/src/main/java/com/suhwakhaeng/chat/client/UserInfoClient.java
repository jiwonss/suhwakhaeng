package com.suhwakhaeng.chat.client;

import com.suhwakhaeng.chat.dto.UserInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@FeignClient(name="${common.server.uri}")
public interface UserInfoClient {
    @GetMapping("/users/{userId}/info")
    UserInfo getUserInfo(@PathVariable Long userId);
}
