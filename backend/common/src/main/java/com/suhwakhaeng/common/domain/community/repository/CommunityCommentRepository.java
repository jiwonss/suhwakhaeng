package com.suhwakhaeng.common.domain.community.repository;

import com.suhwakhaeng.common.domain.community.entity.CommunityComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommunityCommentRepository extends JpaRepository<CommunityComment, Long> {
    // 벌크 연산자
    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM CommunityComment c WHERE c.community.id = :communityId")
    void deleteByCommunityId(Long communityId);

    @Query("select c from CommunityComment c join fetch c.writer where c.community.id = :communityId order by c.createdAt asc")
    List<CommunityComment> findByCommunityId(Long communityId);

}
