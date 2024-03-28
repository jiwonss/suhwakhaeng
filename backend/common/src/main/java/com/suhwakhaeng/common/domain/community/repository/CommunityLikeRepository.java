package com.suhwakhaeng.common.domain.community.repository;

import com.suhwakhaeng.common.domain.community.entity.CommunityLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityLikeRepository extends JpaRepository<CommunityLike, Long> {
}
