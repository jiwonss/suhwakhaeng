package com.suhwakhaeng.common.domain.user.controller;

import com.suhwakhaeng.common.domain.user.dto.BusinessRequest;
import com.suhwakhaeng.common.domain.user.dto.LogoutRequest;
import com.suhwakhaeng.common.domain.user.dto.ProfileRequest;
import com.suhwakhaeng.common.domain.user.service.BusinessService;
import com.suhwakhaeng.common.domain.user.service.UserService;
import com.suhwakhaeng.common.global.common.annotation.CustomPreAuthorize;
import com.suhwakhaeng.common.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final BusinessService businessService;

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @GetMapping("/my-profile")
    public ResponseEntity selectDetailUser(@RequestHeader("X-Authorization-Id") Long userId,
                                           @RequestHeader("X-Authorization-Role") String role) {
        return ResponseEntity.ok().body(Message.success(userService.selectDetailUser(userId)));
    }

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @GetMapping("/{userId}/info")
    public ResponseEntity selectDetailUserInfo(@PathVariable Long userId) {
        return ResponseEntity.ok().body(Message.success(userService.selectDetailUserInfo(userId)));
    }

    @CustomPreAuthorize({"USER","FARMER"})
    @PostMapping("/business")
    public ResponseEntity createBusiness(@RequestHeader("X-Authorization-Id") Long userId, @RequestBody BusinessRequest businessRequest) {
        businessService.createBusiness(userId, businessRequest.businessImage());
        return ResponseEntity.ok().body(Message.success());
    }

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @PatchMapping("/my-profile")
    public ResponseEntity updateUser(@RequestHeader("X-Authorization-Id") Long userId, @Validated @RequestBody ProfileRequest profileRequest) {

        userService.updateUser(userId, profileRequest.toEntity());
        return ResponseEntity.ok().body(Message.success());
    }

    @CustomPreAuthorize({"USER", "ADMIN", "BUISNESS", "FARMER"})
    @PostMapping("/logout")
    public ResponseEntity logout(@RequestHeader("X-Authorization-Id") Long userId,
                                 @RequestBody LogoutRequest request) {
        userService.logout(userId, request);
        return ResponseEntity.ok().body(Message.success());
    }

    @CustomPreAuthorize({"USER", "ADMIN", "BUISNESS", "FARMER"})
    @PostMapping("/withdraw")
    public ResponseEntity witdhdraw(@RequestHeader("X-Authorization-Id") Long userId) {
        userService.withdraw(userId);
        return ResponseEntity.ok().body(Message.success());
    }
}
