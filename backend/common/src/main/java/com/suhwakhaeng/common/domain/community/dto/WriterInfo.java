package com.suhwakhaeng.common.domain.community.dto;

import com.suhwakhaeng.common.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class WriterInfo {
    private Long userId;
    private String nickname;
    private String profileImage;

    public static WriterInfo fromEntity(User user) {
        return new WriterInfo(user.getId(), user.getNickname(), user.getProfileImage());
    }
}
