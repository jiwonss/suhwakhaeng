package com.suhwakhaeng.common.domain.user.controller;

import com.suhwakhaeng.common.domain.user.dto.BusinessRequest;
import com.suhwakhaeng.common.domain.user.dto.ProfileResponse;
import com.suhwakhaeng.common.domain.user.dto.UserInfoResponse;
import com.suhwakhaeng.common.domain.user.service.BusinessService;
import com.suhwakhaeng.common.domain.user.service.UserService;
import com.suhwakhaeng.common.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final BusinessService businessService;

    @GetMapping("/my-profile")
    public ResponseEntity selectDetailUser(@RequestHeader("X-Authorization-Id") Long userId) {
        ProfileResponse profileResponse = userService.selectDetailUser(userId);
        return ResponseEntity.ok().body(Message.success(profileResponse));
    }

    @GetMapping("/{userId}/info")
    public ResponseEntity selectDetailUserInfo(@PathVariable Long userId) {
        UserInfoResponse userInfoResponse = userService.selectDetailUserInfo(userId);
        return ResponseEntity.ok().body(Message.success(userInfoResponse));
    }

    @PostMapping("/business")
    public ResponseEntity createBusiness(@RequestHeader("X-Authorization-Id") Long userId, @RequestBody BusinessRequest businessRequest) {
        businessService.createBusiness(userId, businessRequest.businessImage());
        return ResponseEntity.ok().body(Message.success());
    }
}
