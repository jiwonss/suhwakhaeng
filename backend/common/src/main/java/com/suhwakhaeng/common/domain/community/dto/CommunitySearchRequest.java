package com.suhwakhaeng.common.domain.community.dto;

import com.suhwakhaeng.common.domain.community.enums.Category;

public record CommunitySearchRequest(
        String keyword,
        Category cate,
        Long id
) {
}
