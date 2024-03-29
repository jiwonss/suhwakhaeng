package com.suhwakhaeng.chat.service;

import com.suhwakhaeng.chat.dto.ChatRequest;
import com.suhwakhaeng.chat.dto.ChatResponse;
import com.suhwakhaeng.chat.dto.ChatRoomResponse;
import com.suhwakhaeng.chat.entity.Chat;
import com.suhwakhaeng.chat.entity.ChatRoom;

import java.util.List;
import java.util.UUID;

public interface ChatService {
    void sendChat(ChatRequest chat, String chatRoomId, Long myUserId);
    List<Chat> selectChatMessageList(String chatRoomId);
    ChatRoomResponse selectChatRoomId(Long userId, Long anotherId);
    List<ChatResponse> selectChatUserList(Long userId);
}
