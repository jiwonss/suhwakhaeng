package com.suhwakhaeng.common.domain.community.dto;

import com.suhwakhaeng.common.domain.community.enums.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommunityListResponse {
    private UserInfo user;
    private Long communityId;
    private String communityContent;
    private String thumbnail;

    private Category cate;
    private Boolean isLiked;
    private Long likeCount;
    private Long commentCount;
    private LocalDateTime createdAt;

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserInfo {
        private Long userId;
        private String nickname;
        private String profileImage;
    }
}
