package com.suhwakhaeng.chat.repository;

import com.suhwakhaeng.chat.entity.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.UUID;

public interface ChatRepository extends MongoRepository<Chat, String> {
    List<Chat> findByChatRoomId(UUID chatRoomId);
}
