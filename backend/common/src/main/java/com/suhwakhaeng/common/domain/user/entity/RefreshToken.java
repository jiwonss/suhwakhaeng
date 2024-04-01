package com.suhwakhaeng.common.domain.user.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Duration;
import java.time.LocalDateTime;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class RefreshToken {
    @Id
    @Column(name = "refresh_token")
    private String token;

    @ManyToOne(fetch = LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDateTime expirationDate;

    public static RefreshToken createRefreshToken(String token, User user, Duration expiration) {
        return RefreshToken.builder()
                .token(token)
                .user(user)
                .expirationDate(LocalDateTime.now().plus(expiration))
                .build();
    }

    public void update(String token, Duration expiration) {
        this.token = token;
        this.expirationDate = LocalDateTime.now().plus(expiration);
    }
}
