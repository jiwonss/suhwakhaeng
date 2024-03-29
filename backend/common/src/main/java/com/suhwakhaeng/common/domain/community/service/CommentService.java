package com.suhwakhaeng.common.domain.community.service;

import com.suhwakhaeng.common.domain.community.dto.CommentCreateRequest;
import com.suhwakhaeng.common.domain.community.dto.CommentListResponse;

import java.util.List;

public interface CommentService {
    Long createComment(Long userId, Long communityId, CommentCreateRequest request);
    List<CommentListResponse> selectComment(Long communityId);
    void deleteComment(Long userId, Long commentId);
}
