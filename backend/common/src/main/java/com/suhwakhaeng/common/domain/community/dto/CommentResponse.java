package com.suhwakhaeng.common.domain.community.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponse {
    private WriterInfo user;
    private Long commentId;
    private LocalDateTime createdAt;
    private String content;
}
