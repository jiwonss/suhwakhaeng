package com.suhwakhaeng.chat.service.impl;

import com.suhwakhaeng.chat.client.UserInfoClient;
import com.suhwakhaeng.chat.dto.ChatRequest;
import com.suhwakhaeng.chat.dto.ChatResponse;
import com.suhwakhaeng.chat.dto.ChatRoomResponse;
import com.suhwakhaeng.chat.dto.UserInfo;
import com.suhwakhaeng.chat.entity.Chat;
import com.suhwakhaeng.chat.entity.ChatRoom;
import com.suhwakhaeng.chat.repository.ChatRepository;
import com.suhwakhaeng.chat.repository.ChatRoomRepository;
import com.suhwakhaeng.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatServiceImpl implements ChatService {
    private final RabbitTemplate rabbitTemplate;
    private final TopicExchange topicExchange;
    private final ChatRepository chatRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final UserInfoClient userInfoClient;

    @Override
    public void sendChat(ChatRequest chatRequest, UUID chatRoomId) {
        UserInfo userInfo = userInfoClient.getUserInfo(chatRequest.userId());
        Chat chat = Chat.builder()
                .userId(userInfo.userId())
                .nickname(userInfo.nickname())
                .profileImage(userInfo.profileImage())
                .message(chatRequest.message())
                .chatRoomId(chatRoomId)
                .build();

        rabbitTemplate.convertAndSend(topicExchange.getName(), "room."+chatRoomId, chat);
        chatRepository.save(chat);
    }

    @Override
    public List<Chat> selectChatMessageList(UUID chatRoomId) {
        return chatRepository.findByChatRoomId(chatRoomId);
    }

    @Transactional(readOnly = true)
    @Override
    public List<ChatResponse> selectChatUserList(Long userId) {
        List<UUID> list = chatRoomRepository.findDistinctByUserIdOrAnotherUserId(userId, userId);
        return null;
    }


    @Transactional
    @Override
    public ChatRoomResponse selectChatRoomId(Long userId, Long anotherUserId) {
        UUID id = chatRoomRepository.findChatRoomIdByUserIdAndAnotherUserId(userId, anotherUserId);
        if(id == null) id = chatRoomRepository.findChatRoomIdByUserIdAndAnotherUserId(anotherUserId, userId);
        if(id == null) {
            id = UUID.randomUUID();
            chatRoomRepository.save(ChatRoom.builder()
                    .userId(userId)
                    .anotherUserId(anotherUserId)
                    .id(id)
                    .build());
        }

        return ChatRoomResponse.builder()
                .chatRoomId(id)
                .build();
    }
}
