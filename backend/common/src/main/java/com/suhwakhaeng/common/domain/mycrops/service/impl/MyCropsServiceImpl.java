package com.suhwakhaeng.common.domain.mycrops.service.impl;

import com.suhwakhaeng.common.domain.crops.entity.Crops;
import com.suhwakhaeng.common.domain.crops.exeption.CropsErrorCode;
import com.suhwakhaeng.common.domain.crops.exeption.CropsException;
import com.suhwakhaeng.common.domain.crops.repository.CropsRepository;
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

@Service
@Transactional
@RequiredArgsConstructor
public class MyCropsServiceImpl implements MyCropsService {
    private final MyCropsRepository myCropsRepository;
    private final CropsRepository cropsRepository;
    private final UserRepository userRepository;

    @Override
    public Long createMyCrops(Long userId, Long cropsId, MyCrops myCrops) {
        Crops crops = cropsRepository.findById(cropsId).orElseThrow(() -> new CropsException(CropsErrorCode.NO_EXIST_CROPS));
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(UserErrorCode.NOT_EXIST_USER));

        myCrops = myCrops.toBuilder().user(user).crops(crops).build();

        return myCropsRepository.save(myCrops).getId();
    }

    @Override
    public List<MyCropsResponse> selectMyCrops(Long userId) {
        return null;
    }
}
