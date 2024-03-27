package com.suhwakhaeng.common.domain.community.controller;

import com.suhwakhaeng.common.domain.community.dto.CommunityCreateRequest;
import com.suhwakhaeng.common.domain.community.service.CommunityService;
import com.suhwakhaeng.common.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/community")
public class CommunityController {
    private final CommunityService communityService;

    @PostMapping
    public ResponseEntity createCommunity(@RequestHeader("X-Authorization-Id") Long userId,
                                          @RequestBody CommunityCreateRequest request) {
        communityService.createCommunity(userId, request);

        return ResponseEntity.ok().body(Message.success());
    }
}
