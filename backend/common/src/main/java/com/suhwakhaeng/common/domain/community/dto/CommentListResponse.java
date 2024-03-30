package com.suhwakhaeng.common.domain.community.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentListResponse {
    //    CommentInfo
    private CommentResponse comment;
    private List<CommentResponse> recomment = new ArrayList<>();

}
