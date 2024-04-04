package com.suhwakhaeng.common.domain.user.repository;

import com.suhwakhaeng.common.domain.user.entity.Business;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessRepository extends JpaRepository<Business, Long>, BusinessCustomRepository {
}
