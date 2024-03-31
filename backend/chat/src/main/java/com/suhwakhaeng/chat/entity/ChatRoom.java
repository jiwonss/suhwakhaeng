package com.suhwakhaeng.chat.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
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
    @Column(name = "chat_room_id")
    private String id;
    private Long userId;
    private Long anotherUserId;
    private String message;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime sendTime;

    public void updateLastChat(String message, LocalDateTime sendTime) {
        this.message = message;
        this.sendTime = sendTime;
    }
}
