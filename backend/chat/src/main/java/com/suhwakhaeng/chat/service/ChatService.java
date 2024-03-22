package com.suhwakhaeng.chat.service;

import com.suhwakhaeng.chat.dto.ChatRequest;
import com.suhwakhaeng.chat.dto.ChatResponse;
import com.suhwakhaeng.chat.dto.ChatRoomResponse;
import com.suhwakhaeng.chat.entity.Chat;

import java.util.List;
import java.util.UUID;

public interface ChatService {
    void sendChat(ChatRequest chat, UUID chatRoomId);
    List<Chat> selectChatMessageList(UUID chatRoomId);
    ChatRoomResponse selectChatRoomId(Long userId, Long anotherId);
    List<ChatResponse> selectChatUserList(Long userId);
}
