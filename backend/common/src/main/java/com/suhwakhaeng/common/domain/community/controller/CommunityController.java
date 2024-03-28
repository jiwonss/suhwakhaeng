package com.suhwakhaeng.common.domain.community.controller;

import com.suhwakhaeng.common.domain.community.dto.CommunityCreateRequest;
import com.suhwakhaeng.common.domain.community.dto.CommunitySearchRequest;
import com.suhwakhaeng.common.domain.community.dto.CommunityUpdateRequest;
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

    @GetMapping
    public ResponseEntity selectCommunity(@RequestHeader("X-Authorization-Id") Long userId,
                                          CommunitySearchRequest request) {
        return ResponseEntity.ok().body(Message.success(communityService.selectCommunity(userId, request)));
    }

    @GetMapping("/{communityId}")
    public ResponseEntity selectCommunityDetail(@PathVariable Long communityId,
                                                @RequestHeader("X-Authorization-Id") Long userId) {
        return ResponseEntity.ok().body(Message.success(communityService.selectCommunityDetail(userId, communityId)));
    }

    @PatchMapping("/{communityId}")
    public ResponseEntity updateCommunity(@RequestHeader("X-Authorization-Id") Long userId,
                                          @PathVariable Long communityId,
                                          @RequestBody CommunityUpdateRequest request) {

        communityService.updateCommunity(userId, communityId, request);
        return ResponseEntity.ok().body(Message.success());
    }

    @DeleteMapping("/{communityId}")
    public ResponseEntity deleteCommunity(@RequestHeader("X-Authorization-Id") Long userId,
                                          @PathVariable Long communityId) {
        communityService.deleteCommunity(userId, communityId);
        return ResponseEntity.ok().body(Message.success());
    }

    @PostMapping("/like/{communityId}")
    public ResponseEntity createCommunityLike(@RequestHeader("X-Authorization-Id") Long userId,
                                              @PathVariable Long communityId) {

        communityService.createCommunityLike(userId, communityId);
        return ResponseEntity.ok().body(Message.success());
    }

    @DeleteMapping("/like/{communityId}")
    public ResponseEntity deleteCommunityLike(@RequestHeader("X-Authorization-Id") Long userId,
                                              @PathVariable Long communityId) {
        communityService.deleteCommunityLike(userId, communityId);
        return ResponseEntity.ok().body(Message.success());
    }

    @GetMapping("/my/list")
    public ResponseEntity selectMyCommunity(@RequestHeader("X-Authorization-Id") Long userId, Long lastId) {

        return ResponseEntity.ok().body(Message.success(communityService.selectMyCommunity(userId, lastId)));
    }

}
