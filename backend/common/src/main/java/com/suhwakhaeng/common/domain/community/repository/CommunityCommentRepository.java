package com.suhwakhaeng.common.domain.community.repository;

import com.suhwakhaeng.common.domain.community.entity.CommunityComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface CommunityCommentRepository extends JpaRepository<CommunityComment, Long> {
    // 벌크 연산자
    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM CommunityComment c WHERE c.community.id = :communityId")
    void deleteByCommunityId(Long communityId);

}
