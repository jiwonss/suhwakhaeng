package com.suhwakhaeng.common.domain.community.controller;

import com.suhwakhaeng.common.domain.community.dto.CommentCreateRequest;
import com.suhwakhaeng.common.domain.community.service.CommentService;
import com.suhwakhaeng.common.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/community-comment")
public class CommentController {
    private final CommentService commentService;

    @PostMapping
    public ResponseEntity createComment(@RequestHeader("X-Authorization-Id") Long userId,
                                        @Validated @RequestBody CommentCreateRequest request) {
        commentService.createComment(userId, request);
        return ResponseEntity.ok().body(Message.success());
    }

}
