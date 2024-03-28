package com.suhwakhaeng.chat.repository;

import com.suhwakhaeng.chat.entity.ChatRoom;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ChatRoomRepository extends MongoRepository<ChatRoom, String> {
    ChatRoom findChatRoomByUserIdAndAnotherUserId(Long userId1, Long userId2);
    List<ChatRoom> findByUserId(Long userId);
}
