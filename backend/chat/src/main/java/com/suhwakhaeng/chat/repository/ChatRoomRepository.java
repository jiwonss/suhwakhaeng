package com.suhwakhaeng.chat.repository;

import com.suhwakhaeng.chat.entity.ChatRoom;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatRoomRepository extends MongoRepository<ChatRoom, String> {
    ChatRoom findByUserIdAndAnotherUserId(Long userId, Long anotherUserId);
    List<ChatRoom> findByUserIdOrAnotherUserId(Long userId, Long anotherUserId);
    void deleteAll();
}
