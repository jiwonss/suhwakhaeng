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

import java.util.ArrayList;
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

    /**
     * 채팅 보내기
     * @param chatRequest // 보내는 사람 id, 채팅 내용
     * @param chatRoomId  // 채팅 룸 id = UUID
     */
    @Override
    public void sendChat(ChatRequest chatRequest, UUID chatRoomId) {
        UserInfo userInfo = userInfoClient.getUserInfo(chatRequest.userId());
        // 유저 정보 가져와서 mongoDB에 넣을 chat, 상대에게 보내줄 chat 세팅
        Chat chat = Chat.builder()
                .userId(userInfo.userId())
                .nickname(userInfo.nickname())
                .profileImage(userInfo.profileImage())
                .message(chatRequest.message())
                .chatRoomId(chatRoomId)
                .build();

        // rabbitMQ로 상대방에게 전송
        rabbitTemplate.convertAndSend(topicExchange.getName(), "room."+chatRoomId, chat);
        // mongoDB에 chat 저장
        chatRepository.save(chat);
        // 마지막 chat 수정
        ChatRoom chatRoom = chatRoomRepository.findById(String.valueOf(chatRoomId)).orElseThrow();
        chatRoom.updateLastChat(chatRequest.message());
    }

    @Override
    public List<Chat> selectChatMessageList(UUID chatRoomId) {
        return chatRepository.findByChatRoomId(chatRoomId);
    }

    @Transactional(readOnly = true)
    @Override
    public List<ChatResponse> selectChatUserList(Long userId) {
        List<ChatRoom> chatRoomList = chatRoomRepository.findByUserId(userId);
        List<ChatResponse> resultList = new ArrayList<>();
        for(ChatRoom chatRoom : chatRoomList) {
            UserInfo userInfo = userInfoClient.getUserInfo(chatRoom.getAnotherUserId());
            resultList.add(ChatResponse.builder()
                    .userInfo(userInfo)
                    .lastMessage(chatRoom.getMessage())
                    .sendTime(chatRoom.getSendTime())
                    .build());
        }
        return resultList;
    }


    @Transactional
    @Override
    public ChatRoomResponse selectChatRoomId(Long userId, Long anotherUserId) {
        ChatRoom chatRoom = chatRoomRepository.findChatRoomByUserIdAndAnotherUserId(userId, anotherUserId);
        UUID id = UUID.randomUUID();
        if(chatRoom == null) {
            chatRoomRepository.save(ChatRoom.builder()
                    .userId(userId)
                    .anotherUserId(anotherUserId)
                    .id(id)
                    .build());
            chatRoomRepository.save(ChatRoom.builder()
                    .userId(anotherUserId)
                    .anotherUserId(userId)
                    .id(id)
                    .build());
        } else id = chatRoom.getId();
        return ChatRoomResponse.builder()
                .chatRoomId(id)
                .build();
    }
}
