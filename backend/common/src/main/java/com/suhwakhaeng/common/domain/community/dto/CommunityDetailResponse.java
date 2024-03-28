package com.suhwakhaeng.common.domain.community.dto;

import com.suhwakhaeng.common.domain.community.enums.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommunityDetailResponse {
    WriterInfo user;

    private Long communityId;
    private Category cate;
    private String communityContent;

    private String image1;
    private String image2;
    private String image3;
    private String image4;


    private Boolean isLiked;
    private Long likeCount;
    private Long commentCount;
    private LocalDateTime createdAt;
}
