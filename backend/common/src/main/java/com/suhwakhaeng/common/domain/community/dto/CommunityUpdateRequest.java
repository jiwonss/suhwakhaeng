package com.suhwakhaeng.common.domain.community.dto;

import com.suhwakhaeng.common.domain.community.entity.Community;
import com.suhwakhaeng.common.domain.community.enums.Category;

public record CommunityUpdateRequest(
        Category cate,
        String content,
        String image1,
        String image2,
        String image3,
        String image4
) {
    public Community toEntity() {
        return Community.builder()
                .cate(cate)
                .content(content)
                .image1(image1)
                .image2(image2)
                .image3(image3)
                .image4(image4)
                .build();
    }
}
