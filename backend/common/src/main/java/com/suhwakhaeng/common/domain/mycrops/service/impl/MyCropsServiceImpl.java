package com.suhwakhaeng.common.domain.mycrops.service.impl;

import com.suhwakhaeng.common.domain.crops.entity.CropsVariety;
import com.suhwakhaeng.common.domain.crops.exeption.CropsVarietyException;
import com.suhwakhaeng.common.domain.crops.repository.CropsVarietyRepository;
import com.suhwakhaeng.common.domain.mycrops.dto.MyCropsRequest;
import com.suhwakhaeng.common.domain.mycrops.dto.MyCropsResponse;
import com.suhwakhaeng.common.domain.mycrops.entity.MyCrops;
import com.suhwakhaeng.common.domain.mycrops.repository.MyCropsRepository;
import com.suhwakhaeng.common.domain.mycrops.service.MyCropsService;
import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.domain.user.exception.UserErrorCode;
import com.suhwakhaeng.common.domain.user.exception.UserException;
import com.suhwakhaeng.common.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.suhwakhaeng.common.domain.crops.exeption.CropsVarietyErrorCode.*;

@Service
@Transactional
@RequiredArgsConstructor
public class MyCropsServiceImpl implements MyCropsService {
    private final MyCropsRepository myCropsRepository;
    private final CropsVarietyRepository cropsVarietyRepository;
    private final UserRepository userRepository;

    @Override
    public Long createMyCrops(Long userId, MyCropsRequest myCropsRequest) {
        CropsVariety cropsVariety = cropsVarietyRepository.findById(myCropsRequest.cropsVarietyId()).orElseThrow(() -> new CropsVarietyException(NO_EXIST_CROPS));

        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(UserErrorCode.NOT_EXIST_USER));
        MyCrops myCrops = myCropsRequest.toEntity();
        myCrops = myCrops.toBuilder().user(user).cropsVariety(cropsVariety).build();

        return myCropsRepository.save(myCrops).getId();
    }

    @Override
    public List<MyCropsResponse> selectMyCrops(Long userId) {
        return myCropsRepository.findMyCropsByUserId(userId);
    }
}
