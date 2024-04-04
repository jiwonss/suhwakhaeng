package com.suhwakhaeng.common.domain.community.repository;

import com.suhwakhaeng.common.domain.community.entity.CommunityLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface CommunityLikeRepository extends JpaRepository<CommunityLike, Long> {
    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM CommunityLike c WHERE c.communityLikePK.community.id = :communityId")
    void deleteByCommunityId(Long communityId);
}
