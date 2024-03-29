package com.suhwakhaeng.common.domain.community.dto;

import jakarta.validation.constraints.NotNull;

public record CommentCreateRequest(
        Long communityId,
        @NotNull
        Long parentId,
        String content
) {
}
