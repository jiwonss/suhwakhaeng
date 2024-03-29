package com.suhwakhaeng.common.domain.community.dto;

import jakarta.validation.constraints.NotNull;

public record CommentCreateRequest(
        @NotNull
        Long parentId,
        String content
) {
}
