package com.suhwakhaeng.chat.controller;

import com.suhwakhaeng.chat.dto.Message;
import com.suhwakhaeng.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @GetMapping("/chat-room-id/{anotherUserId}")
    public ResponseEntity<?> selectChatRoomId(@RequestHeader("X-Authorization-Id") Long userId, @RequestHeader("X-Authorization-Role") String role, @PathVariable Long anotherUserId) {
        return ResponseEntity.ok().body(Message.success(chatService.selectChatRoomId(userId, anotherUserId, role)));
    }

    @GetMapping("/list/message/{chatRoomId}")
    public ResponseEntity<?> selectChatMessageList(@PathVariable String chatRoomId) {
        return ResponseEntity.ok().body(Message.success(chatService.selectChatMessageList(chatRoomId)));
    }

    @GetMapping("/list/log")
    public ResponseEntity<?> selectChatUserList(@RequestHeader("X-Authorization-Id") Long userId, @RequestHeader("X-Authorization-Role") String role) {
        return ResponseEntity.ok().body(Message.success(chatService.selectChatUserList(userId, role)));
    }
}
