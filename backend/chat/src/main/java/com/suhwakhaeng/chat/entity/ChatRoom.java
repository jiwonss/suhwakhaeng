package com.suhwakhaeng.chat.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

import static jakarta.persistence.GenerationType.IDENTITY;

@Document(collection = "chatRoom") // mongo db는 @Entity가 아닌 @Document
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "chat_room_id")
    private UUID id;
    private Long userId;
    private Long anotherUserId;
}
