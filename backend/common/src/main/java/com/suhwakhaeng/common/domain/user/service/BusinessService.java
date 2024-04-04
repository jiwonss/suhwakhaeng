package com.suhwakhaeng.common.domain.user.service;

import com.suhwakhaeng.common.domain.user.dto.BusinessResponse;

import java.util.List;

public interface BusinessService {
    Long createBusiness(Long userId, String businessImage);
    List<BusinessResponse> selectBusiness(Long lastId);

    void updateBusiness(Long businessId);
}
