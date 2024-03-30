package com.suhwakhaeng.common.domain.community.repository;

import com.suhwakhaeng.common.domain.community.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Community, Long>, CommunityCustomRepository {
}
