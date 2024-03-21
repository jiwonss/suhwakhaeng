package com.suhwakhaeng.chat.controller;

import com.suhwakhaeng.chat.dto.ChatRequest;
import com.suhwakhaeng.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@RestController
public class StompController {
    private final ChatService chatService;

    @MessageMapping("/room/{chattingRoomId}")
    public void sendChat(
            @DestinationVariable UUID chattingRoomId,
            ChatRequest chatRequest
    ) {
        chatService.sendChat(chatRequest, chattingRoomId);
    }
}
