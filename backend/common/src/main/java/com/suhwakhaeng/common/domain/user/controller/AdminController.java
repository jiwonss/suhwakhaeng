package com.suhwakhaeng.common.domain.user.controller;

import com.suhwakhaeng.common.domain.user.service.BusinessService;
import com.suhwakhaeng.common.domain.user.service.UserService;
import com.suhwakhaeng.common.global.common.annotation.CustomPreAuthorize;
import com.suhwakhaeng.common.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {
    private final BusinessService businessService;

    @CustomPreAuthorize({"ADMIN"})
    @GetMapping("/business")
    public ResponseEntity selectBusiness(Long lastId) {
        return ResponseEntity.ok().body(Message.success(businessService.selectBusiness(lastId)));
    }

    @CustomPreAuthorize({"ADMIN"})
    @PatchMapping("/business/{businessId}")
    public ResponseEntity updateBusiness(@PathVariable Long businessId) {
        businessService.updateBusiness(businessId);
        return ResponseEntity.ok().body(Message.success());
    }
}
