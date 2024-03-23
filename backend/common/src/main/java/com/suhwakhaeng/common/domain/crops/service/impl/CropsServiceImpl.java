package com.suhwakhaeng.common.domain.crops.service.impl;

import com.suhwakhaeng.common.domain.crops.dto.*;
import com.suhwakhaeng.common.domain.crops.entity.*;
import com.suhwakhaeng.common.domain.crops.enums.CropsCate;
import com.suhwakhaeng.common.domain.crops.exeption.CropsErrorCode;
import com.suhwakhaeng.common.domain.crops.exeption.CropsException;
import com.suhwakhaeng.common.domain.crops.repository.*;
import com.suhwakhaeng.common.domain.crops.service.CropsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CropsServiceImpl implements CropsService {

    private final CropsRepository cropsRepository;
    private final CropsVarietyRepository cropsVarietyRepository;
    private final CultivationCharacteristicRepository cultivationCharacteristicRepository;
    private final ShippingTimeTableRepository shippingTimeTableRepository;
    private final ShippingTimeTableValueRepository shippingTimeTableValueRepository;
    private final CropsSearchRepository cropsSearchRepository;

    @Override
    public void createCrops(CropsCreateRequest cropsCreateRequest) {
        // 작물
        Crops crops = cropsRepository.save(cropsCreateRequest.toCropsEntity());

        // 재배적 특성
        if (!crops.getCategory().equals(CropsCate.FOOD_CROPS)) {
            cultivationCharacteristicRepository.save(cropsCreateRequest.toCultivationCharacteristicEntity(crops));
        }

        // 작형별 출하시기 표
        ShippingTimeTable shippingTimeTable = shippingTimeTableRepository.save(cropsCreateRequest.toShippingTimeTableEntity(crops));

        // 작형별 출하시기 표 값
        List<ShippingTimeTableValueInfo> shippingTimeTableValueInfoList = cropsCreateRequest.shippingTimeTableInfo().getShippingTimeTableValueInfoList();
        for (ShippingTimeTableValueInfo shippingTimeTableValueInfo : shippingTimeTableValueInfoList) {
            shippingTimeTableValueRepository.save(shippingTimeTableValueInfo.toEntity(shippingTimeTable));
        }
    }

    @Override
    public void createCropsVariety(CropsVarietyCreateRequest cropsVarietyCreateRequest) {
        Crops crops = cropsRepository.findById(cropsVarietyCreateRequest.cropsId()).orElseThrow(() -> new CropsException(CropsErrorCode.NO_EXIST_CROPS));
        CropsVariety cropsVariety = cropsVarietyCreateRequest.toEntity(crops);
        cropsVarietyRepository.save(cropsVariety);
    }

    @Override
    public List<CropsListResponse> selectListCrops(String keyword) {
        return cropsSearchRepository.searchCrops(keyword);
    }

    @Override
    public List<CropsVarietyListResponse> selectListCropsVariety(Long cropsId) {
        return cropsVarietyRepository.findAllByCropsId(cropsId).stream()
                .map(CropsVarietyListResponse::from)
                .collect(Collectors.toList());
    }
}