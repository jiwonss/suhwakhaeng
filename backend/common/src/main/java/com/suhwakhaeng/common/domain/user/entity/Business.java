package com.suhwakhaeng.common.domain.user.entity;

import com.suhwakhaeng.common.domain.user.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

import static jakarta.persistence.FetchType.*;

@Entity
@Getter
@Builder
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Business {

    @Id
    @Column(name = "user_id")
    private Long id;

    @OneToOne(fetch = LAZY)
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "business_image")
    private String image;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    private boolean isAccepted;

    public void accept() {
        this.isAccepted = true;
    }
}
