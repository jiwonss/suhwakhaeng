package com.suhwakhaeng.chat.repository;

import com.suhwakhaeng.chat.entity.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatRepository extends MongoRepository<Chat, String> {
    List<Chat> findByChatRoomId(String chatRoomId);
}
