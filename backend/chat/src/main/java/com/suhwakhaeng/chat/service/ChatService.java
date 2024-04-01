package com.suhwakhaeng.chat.service;

import com.suhwakhaeng.chat.dto.ChatRequest;
import com.suhwakhaeng.chat.dto.ChatResponse;
import com.suhwakhaeng.chat.dto.ChatRoomResponse;
import com.suhwakhaeng.chat.entity.Chat;
import java.util.List;

public interface ChatService {
    void sendChat(ChatRequest chat, String chatRoomId, Long myUserId, String role);
    List<Chat> selectChatMessageList(String chatRoomId);
    ChatRoomResponse selectChatRoomId(Long userId, Long anotherId, String role);
    List<ChatResponse> selectChatUserList(Long userId, String role);
}
