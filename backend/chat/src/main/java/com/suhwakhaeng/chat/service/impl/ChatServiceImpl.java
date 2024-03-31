package com.suhwakhaeng.chat.service.impl;

import com.suhwakhaeng.chat.client.CommonClient;
import com.suhwakhaeng.chat.dto.*;
import com.suhwakhaeng.chat.entity.Chat;
import com.suhwakhaeng.chat.entity.ChatRoom;
import com.suhwakhaeng.chat.exception.ChatErrorCode;
import com.suhwakhaeng.chat.exception.ChatException;
import com.suhwakhaeng.chat.repository.ChatRepository;
import com.suhwakhaeng.chat.repository.ChatRoomRepository;
import com.suhwakhaeng.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
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
    private final CommonClient commonClient;

    /**
     * 채팅 보내기
     * @param chatRequest // 채팅 내용
     * @param chatRoomId  // 채팅 룸 id = UUID
     * @param myUserId
     */
    @Transactional
    @Override
    public void sendChat(ChatRequest chatRequest, String chatRoomId, Long myUserId) {
        Message<UserInfo> response = commonClient.getUserInfo(myUserId);
        UserInfo userInfo = response.getDataBody();
        // 유저 정보 가져와서 mongoDB에 넣을 chat, 상대에게 보내줄 chat 세팅
        Chat chat = Chat.builder()
                .userId(userInfo.userId())
                .nickname(userInfo.nickname())
                .profileImage(userInfo.profileImage())
                .message(chatRequest.message())
                .chatRoomId(chatRoomId)
                .sendTime(LocalDateTime.now())
                .build();

        // rabbitMQ로 상대방에게 전송
        rabbitTemplate.convertAndSend(topicExchange.getName(), "room." + chatRoomId, chat);
        // mongoDB에 chat 저장
        chatRepository.save(chat);
        // 마지막 chat 수정
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId).orElseThrow(() -> new ChatException(ChatErrorCode.UNKNOWN_ERROR));
        chatRoom.updateLastChat(chatRequest.message(), chat.getSendTime());
        Long anotherUserId = chatRoom.getUserId() == myUserId ? chatRoom.getAnotherUserId() : chatRoom.getUserId();
        commonClient.sendMessageToken(FcmTokenRequest.builder()
                .userId(anotherUserId)
                .body(chatRequest.message())
                .title(userInfo.nickname())
                .build());
        chatRoomRepository.save(chatRoom);
    }

    @Override
    public List<Chat> selectChatMessageList(String chatRoomId) {
        return chatRepository.findByChatRoomId(chatRoomId);
    }

    @Transactional(readOnly = true)
    @Override
    public List<ChatResponse> selectChatUserList(Long userId) {
        List<ChatResponse> resultList = new ArrayList<>();
        List<ChatRoom> chatRoomList = chatRoomRepository.findByUserIdOrAnotherUserId(userId, userId);
        for(ChatRoom chatRoom : chatRoomList) {
            if(chatRoom.getMessage() == null || chatRoom.getMessage() == "") continue;
            Long anotherUserId = chatRoom.getUserId() == userId ? chatRoom.getAnotherUserId() : chatRoom.getUserId();
            Message<UserInfo> response = commonClient.getUserInfo(anotherUserId);
            UserInfo userInfo = response.getDataBody();
            resultList.add(ChatResponse.builder()
                    .userInfo(userInfo)
                    .lastMessage(chatRoom.getMessage())
                    .id(chatRoom.getId())
                    .sendTime(chatRoom.getSendTime())
                    .build());
        }
        return resultList;
    }

    @Override
    public ChatRoomResponse selectChatRoomId(Long userId, Long anotherUserId) {
        if(userId == anotherUserId) throw new ChatException(ChatErrorCode.CANT_SEND_MESSAGE_MYSELF);
        ChatRoom chatRoom = chatRoomRepository.findByUserIdAndAnotherUserId(userId, anotherUserId);
        if(chatRoom == null) chatRoom = chatRoomRepository.findByUserIdAndAnotherUserId(anotherUserId, userId);
        if(chatRoom == null) {
            String id = UUID.randomUUID().toString();
            chatRoom = chatRoomRepository.save(ChatRoom.builder()
                        .userId(userId)
                        .anotherUserId(anotherUserId)
                        .id(id)
                        .build());
        }
        return ChatRoomResponse.builder()
                .chatRoomId(chatRoom.getId())
                .build();
    }

    public UserInfo getUserInfo(Long userId) {
        log.info("openFeign 테스트 input - userId : {}", userId);
        log.info("openFeign 테스트 output - userId : {}", commonClient.getUserInfo(userId));
        return commonClient.getUserInfo(userId).getDataBody();
    }

}
