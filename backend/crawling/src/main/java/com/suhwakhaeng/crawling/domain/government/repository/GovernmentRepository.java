package com.suhwakhaeng.crawling.domain.government.repository;

import com.suhwakhaeng.crawling.domain.government.entity.Government;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GovernmentRepository extends JpaRepository<Government, Long> {
}
