package com.suhwakhaeng.common.domain.user.service.impl;

import com.suhwakhaeng.common.domain.user.dto.BusinessResponse;
import com.suhwakhaeng.common.domain.user.entity.Business;
import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.domain.user.exception.BusinessErrorCode;
import com.suhwakhaeng.common.domain.user.exception.BusinessException;
import com.suhwakhaeng.common.domain.user.exception.UserErrorCode;
import com.suhwakhaeng.common.domain.user.exception.UserException;
import com.suhwakhaeng.common.domain.user.repository.BusinessRepository;
import com.suhwakhaeng.common.domain.user.repository.UserRepository;
import com.suhwakhaeng.common.domain.user.service.BusinessService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.suhwakhaeng.common.domain.user.exception.BusinessErrorCode.*;

@Service
@Transactional
@RequiredArgsConstructor
public class BusinessServiceImpl implements BusinessService {
    private final BusinessRepository businessRepository;
    private final UserRepository userRepository;

    @Override
    public Long createBusiness(Long userId, String businessImage) {

        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(UserErrorCode.NOT_EXIST_USER));
        Business business = Business.builder().user(user).image(businessImage).isAccepted(false).build();
        businessRepository.save(business);

        return business.getId();
    }

    @Transactional(readOnly = true)
    @Override
    public List<BusinessResponse> selectBusiness(Long lastId) {
        return businessRepository.selectBusiness(lastId);
    }

    @Override
    public void updateBusiness(Long businessId) {
        Business business = businessRepository.findById(businessId)
                .orElseThrow(() -> new BusinessException(NOT_EXIST_BUSINESS));

        business.accept();
    }
}
