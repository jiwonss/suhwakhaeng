package com.suhwakhaeng.chat.controller;

import com.suhwakhaeng.chat.dto.Message;
import com.suhwakhaeng.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @GetMapping("/{anotherUserId}")
    public ResponseEntity<?> selectChatRoomId(@RequestHeader("X-Authorization-Id") Long userId, @PathVariable Long anotherUserId) {
        return ResponseEntity.ok().body(Message.success(chatService.selectChatRoomId(userId, anotherUserId)));
    }

    @GetMapping("/{chatRoomId}")
    public ResponseEntity<?> selectChatMessageList(@PathVariable UUID chatRoomId) {
        return ResponseEntity.ok().body(Message.success(chatService.selectChatMessageList(chatRoomId)));
    }

    @GetMapping
    public ResponseEntity<?> selectChatUserList(@RequestHeader("X-Authorization-Id") Long userId) {
        return ResponseEntity.ok().body(Message.success(chatService.selectChatUserList(userId)));
    }
}
