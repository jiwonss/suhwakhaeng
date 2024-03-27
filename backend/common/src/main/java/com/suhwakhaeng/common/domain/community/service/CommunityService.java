package com.suhwakhaeng.common.domain.community.service;

import com.suhwakhaeng.common.domain.community.dto.CommunityCreateRequest;

public interface CommunityService {
    Long createCommunity(Long userId, CommunityCreateRequest request);
}
