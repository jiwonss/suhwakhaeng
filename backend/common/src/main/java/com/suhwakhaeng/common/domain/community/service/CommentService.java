package com.suhwakhaeng.common.domain.community.service;

import com.suhwakhaeng.common.domain.community.dto.CommentCreateRequest;

public interface CommentService {
    Long createComment(Long userId, CommentCreateRequest request);
}
