package com.suhwakhaeng.chat.client;

import com.suhwakhaeng.chat.dto.Message;
import com.suhwakhaeng.chat.dto.UserInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


//@FeignClient(name="${common.server.uri}")
@FeignClient(value = "common", url = "${common.server.uri}")
public interface UserInfoClient {
    @GetMapping("/users/{userId}/info")
    Message<UserInfo> getUserInfo(@PathVariable Long userId);
}
