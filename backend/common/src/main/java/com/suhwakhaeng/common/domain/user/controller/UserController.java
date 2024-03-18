package com.suhwakhaeng.common.domain.user.controller;

import com.suhwakhaeng.common.domain.user.dto.ProfileResponse;
import com.suhwakhaeng.common.domain.user.service.UserService;
import com.suhwakhaeng.common.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/my-profile")
    public ResponseEntity selectDetailUser(@RequestHeader("X-Authorization-Id") Long userId) {
        ProfileResponse profileResponse = userService.selectDetailUser(userId);
        return ResponseEntity.ok().body(Message.success(profileResponse));
    }
}
