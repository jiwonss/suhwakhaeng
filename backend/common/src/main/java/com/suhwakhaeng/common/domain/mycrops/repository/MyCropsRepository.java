package com.suhwakhaeng.common.domain.mycrops.repository;

import com.suhwakhaeng.common.domain.mycrops.dto.MyCropsResponse;
import com.suhwakhaeng.common.domain.mycrops.entity.MyCrops;
import com.suhwakhaeng.common.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MyCropsRepository extends JpaRepository<MyCrops, Long>, MyCropsCustomRepository {
    List<MyCrops> findMyCropsByUser(User user);
}
