package com.suhwakhaeng.chat.repository;

import com.suhwakhaeng.chat.entity.ChatRoom;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.UUID;

public interface ChatRoomRepository extends MongoRepository<ChatRoom, String> {
    UUID findChatRoomIdByUserIdAndAnotherUserId(Long userId1, Long userId2);
    List<UUID> findDistinctByUserIdOrAnotherUserId(Long userId1, Long UserId2);
}
