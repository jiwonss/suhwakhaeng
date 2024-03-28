package com.suhwakhaeng.common.domain.community.service;

import com.suhwakhaeng.common.domain.community.dto.CommunityCreateRequest;
import com.suhwakhaeng.common.domain.community.dto.CommunityDetailResponse;
import com.suhwakhaeng.common.domain.community.dto.CommunitySearchRequest;
import com.suhwakhaeng.common.domain.community.dto.CommunityListResponse;

import java.util.List;

public interface CommunityService {
    Long createCommunity(Long userId, CommunityCreateRequest request);
    List<CommunityListResponse> selectCommunity(Long userId, CommunitySearchRequest request);
    CommunityDetailResponse selectCommunityDetail(Long userId, Long communityId);

}
