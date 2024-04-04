package com.suhwakhaeng.common.domain.user.repository;

import com.suhwakhaeng.common.domain.user.dto.BusinessResponse;

import java.util.List;

public interface BusinessCustomRepository {
    List<BusinessResponse> selectBusiness(Long lastId);
}
