package com.suhwakhaeng.common.domain.user.service.impl;

import com.suhwakhaeng.common.domain.user.entity.Business;
import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.domain.user.repository.BusinessRepository;
import com.suhwakhaeng.common.domain.user.repository.UserRepository;
import com.suhwakhaeng.common.domain.user.service.BusinessService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class BusinessServiceImpl implements BusinessService {
    private final BusinessRepository businessRepository;
    private final UserRepository userRepository;

    @Override
    public Long createBusiness(Long userId, String businessImage) {

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException());
        Business business = Business.builder().user(user).image(businessImage).isAccepted(false).build();
        businessRepository.save(business);

        return business.getId();
    }
}
