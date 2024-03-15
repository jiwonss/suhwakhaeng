package com.suhwakhaeng.common.domain.user.entity;

import com.suhwakhaeng.common.domain.user.enums.Role;
import com.suhwakhaeng.common.domain.user.enums.Status;
import com.suhwakhaeng.common.global.common.entity.Location;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    @Id
    @GeneratedValue
    private Long id;
    private String nickname;
    private String profileImage;
    private String email;

    @Embedded
    private OauthId oauthId;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Embedded
    private Location location;

}
