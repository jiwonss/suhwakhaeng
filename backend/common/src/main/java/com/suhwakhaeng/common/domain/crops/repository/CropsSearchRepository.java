package com.suhwakhaeng.common.domain.crops.repository;

import com.suhwakhaeng.common.domain.crops.dto.CropsListResponse;

import java.util.List;

public interface CropsSearchRepository {

    List<CropsListResponse> searchCrops(String keyword);

}
