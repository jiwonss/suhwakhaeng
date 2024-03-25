package com.suhwakhaeng.common.domain.mycrops.repository;

import com.suhwakhaeng.common.domain.mycrops.dto.MyCropsResponse;

import java.util.List;

public interface MyCropsCustomRepository {
    List<MyCropsResponse> findMyCropsByUserId(Long userId);
}
