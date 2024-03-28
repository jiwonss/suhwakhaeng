package com.suhwakhaeng.common.domain.community.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class WriterInfo {
    private Long userId;
    private String nickname;
    private String profileImage;
}
