package com.suhwakhaeng.common.domain.user.controller;

import com.suhwakhaeng.common.domain.user.service.UserService;
import com.suhwakhaeng.common.global.common.annotation.CustomPreAuthorize;
import com.suhwakhaeng.common.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;

    @CustomPreAuthorize({"ADMIN"})
    @GetMapping("/business")
    public ResponseEntity selectBusiness(Long lastId) {
        return ResponseEntity.ok().body(Message.success(userService.selectBusiness(lastId)));
    }

}
