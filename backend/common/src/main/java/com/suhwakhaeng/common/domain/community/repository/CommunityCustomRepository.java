package com.suhwakhaeng.common.domain.community.repository;

import com.suhwakhaeng.common.domain.community.dto.CommunitySearchRequest;
import com.suhwakhaeng.common.domain.community.dto.CommunityListResponse;

import java.util.List;

public interface CommunityCustomRepository {
    List<CommunityListResponse> searchCommunity(Long userId, CommunitySearchRequest request);
}
