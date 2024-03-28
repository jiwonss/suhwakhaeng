package com.suhwakhaeng.common.domain.community.service;

import com.suhwakhaeng.common.domain.community.dto.*;

import java.util.List;

public interface CommunityService {
    Long createCommunity(Long userId, CommunityCreateRequest request);
    List<CommunityListResponse> selectCommunity(Long userId, CommunitySearchRequest request);
    CommunityDetailResponse selectCommunityDetail(Long userId, Long communityId);
    void createCommunityLike(Long userId, Long communityId);
    void deleteCommunityLike(Long userId, Long communityId);
    void updateCommunity(Long userId, Long communityId, CommunityUpdateRequest request);

    void deleteCommunity(Long userId, Long communityId);
}
