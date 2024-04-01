package com.suhwakhaeng.common.domain.community.controller;

import com.suhwakhaeng.common.domain.community.dto.CommentCreateRequest;
import com.suhwakhaeng.common.domain.community.dto.CommunityCreateRequest;
import com.suhwakhaeng.common.domain.community.dto.CommunitySearchRequest;
import com.suhwakhaeng.common.domain.community.dto.CommunityUpdateRequest;
import com.suhwakhaeng.common.domain.community.service.CommentService;
import com.suhwakhaeng.common.domain.community.service.CommunityService;
import com.suhwakhaeng.common.global.common.annotation.CustomPreAuthorize;
import com.suhwakhaeng.common.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/community")
public class CommunityController {
    private final CommunityService communityService;
    private final CommentService commentService;

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @PostMapping
    public ResponseEntity createCommunity(@RequestHeader("X-Authorization-Id") Long userId,
                                          @RequestBody CommunityCreateRequest request) {
        communityService.createCommunity(userId, request);
        return ResponseEntity.ok().body(Message.success());
    }

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @GetMapping
    public ResponseEntity selectCommunity(@RequestHeader("X-Authorization-Id") Long userId,
                                          CommunitySearchRequest request) {
        return ResponseEntity.ok().body(Message.success(communityService.selectCommunity(userId, request)));
    }

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @GetMapping("/{communityId}")
    public ResponseEntity selectCommunityDetail(@PathVariable Long communityId,
                                                @RequestHeader("X-Authorization-Id") Long userId) {
        return ResponseEntity.ok().body(Message.success(communityService.selectCommunityDetail(userId, communityId)));
    }

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @PatchMapping("/{communityId}")
    public ResponseEntity updateCommunity(@RequestHeader("X-Authorization-Id") Long userId,
                                          @PathVariable Long communityId,
                                          @RequestBody CommunityUpdateRequest request) {

        communityService.updateCommunity(userId, communityId, request);
        return ResponseEntity.ok().body(Message.success());
    }

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @DeleteMapping("/{communityId}")
    public ResponseEntity deleteCommunity(@RequestHeader("X-Authorization-Id") Long userId,
                                          @PathVariable Long communityId) {
        communityService.deleteCommunity(userId, communityId);
        return ResponseEntity.ok().body(Message.success());
    }

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @PostMapping("/like/{communityId}")
    public ResponseEntity createCommunityLike(@RequestHeader("X-Authorization-Id") Long userId,
                                              @PathVariable Long communityId) {

        communityService.createCommunityLike(userId, communityId);
        return ResponseEntity.ok().body(Message.success());
    }

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @DeleteMapping("/like/{communityId}")
    public ResponseEntity deleteCommunityLike(@RequestHeader("X-Authorization-Id") Long userId,
                                              @PathVariable Long communityId) {
        communityService.deleteCommunityLike(userId, communityId);
        return ResponseEntity.ok().body(Message.success());
    }

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @GetMapping("/my/list")
    public ResponseEntity selectMyCommunity(@RequestHeader("X-Authorization-Id") Long userId, Long lastId) {

        return ResponseEntity.ok().body(Message.success(communityService.selectMyCommunity(userId, lastId)));
    }

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @PostMapping("/{communityId}/comment")
    public ResponseEntity createComment(@RequestHeader("X-Authorization-Id") Long userId,
                                        @Validated @RequestBody CommentCreateRequest request,
                                        @PathVariable Long communityId) {
        commentService.createComment(userId, communityId, request);
        return ResponseEntity.ok().body(Message.success());
    }

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @GetMapping("/{communityId}/comment")
    public ResponseEntity selectComment(@PathVariable Long communityId) {
        return ResponseEntity.ok().body(Message.success(commentService.selectComment(communityId)));
    }

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @DeleteMapping("/{communityId}/comment/{commentId}")
    public ResponseEntity deleteComment(@RequestHeader("X-Authorization-Id") Long userId,
                                        @PathVariable Long commentId) {

        commentService.deleteComment(userId, commentId);

        return ResponseEntity.ok(Message.success());
    }
}
