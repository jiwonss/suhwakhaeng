package com.suhwakhaeng.chat.controller;

import com.suhwakhaeng.chat.dto.ChatRequest;
import com.suhwakhaeng.chat.global.jwt.JwtUtils;
import com.suhwakhaeng.chat.global.jwt.TokenInfo;
import com.suhwakhaeng.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RequiredArgsConstructor
@RestController
public class StompController {
    @Autowired
    private JwtUtils jwtUtils;

    private final ChatService chatService;

    @MessageMapping("/room/{chattingRoomId}")
    public void sendChat(
            @DestinationVariable String chattingRoomId,
            @Header("Authorization") String token,
            ChatRequest chatRequest
    ) {
        TokenInfo tokenInfo = jwtUtils.parseToken(token);
        chatService.sendChat(chatRequest, chattingRoomId, Long.valueOf(tokenInfo.getUserId()), tokenInfo.getRole());
    }
}
