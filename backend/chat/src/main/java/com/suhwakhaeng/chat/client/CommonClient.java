package com.suhwakhaeng.chat.client;

import com.suhwakhaeng.chat.dto.FcmTokenRequest;
import com.suhwakhaeng.chat.dto.Message;
import com.suhwakhaeng.chat.dto.UserInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

//@FeignClient(name="${common.server.uri}")
@FeignClient(value = "common", url = "${common.server.uri}")
public interface CommonClient {
    @GetMapping("/users/{userId}/info")
    Message<UserInfo> getUserInfo(@PathVariable Long userId);

    @PostMapping("/fcm/token")
    Message<?> sendMessageToken(@RequestBody FcmTokenRequest fcmTokenRequest);
}
