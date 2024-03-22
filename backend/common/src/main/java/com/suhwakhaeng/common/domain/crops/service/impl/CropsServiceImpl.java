package com.suhwakhaeng.common.domain.crops.service.impl;

import com.suhwakhaeng.common.domain.crops.dto.*;
import com.suhwakhaeng.common.domain.crops.entity.Crops;
import com.suhwakhaeng.common.domain.crops.entity.CropsVariety;
import com.suhwakhaeng.common.domain.crops.entity.CultivationCharacteristic;
import com.suhwakhaeng.common.domain.crops.entity.ShippingTimeTable;
import com.suhwakhaeng.common.domain.crops.enums.CropsCate;
import com.suhwakhaeng.common.domain.crops.exeption.CropsErrorCode;
import com.suhwakhaeng.common.domain.crops.exeption.CropsException;
import com.suhwakhaeng.common.domain.crops.repository.CropsRepository;
import com.suhwakhaeng.common.domain.crops.repository.CropsVarietyRepository;
import com.suhwakhaeng.common.domain.crops.repository.CultivationCharacteristicRepository;
import com.suhwakhaeng.common.domain.crops.repository.ShippingTimeTableRepository;
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

    @Override
    public void createCrops(CropsCreateRequest cropsCreateRequest) {
        CropsCate category = CropsCate.valueOf(cropsCreateRequest.category());

        // 작물
        Crops crops = Crops.builder()
                .name(cropsCreateRequest.name())
                .category(category)
                .growingCondition(cropsCreateRequest.growingCondition())
                .diseaseType(cropsCreateRequest.diseaseType())
                .pestType(cropsCreateRequest.pestType())
                .build();
        crops = cropsRepository.save(crops);

        // 재배적 특성
        if (!category.equals(CropsCate.FOOD_CROPS)) {
            CultivationCharacteristicInfo cultivationCharacteristicInfo = cropsCreateRequest.cultivationCharacteristicInfo();
            CultivationCharacteristic cultivationCharacteristic = CultivationCharacteristic.builder()
                    .crops(crops)
                    .scientificName(cultivationCharacteristicInfo.getScientificName())
                    .classification(cultivationCharacteristicInfo.getClassification())
                    .physiologicalCharacteristic(cultivationCharacteristicInfo.getPhysiologicalCharacteristic())
                    .mainTech(cultivationCharacteristicInfo.getMainTech())
                    .build();
            cultivationCharacteristicRepository.save(cultivationCharacteristic);
        }

        // 작형별 출하시기 표
        for (ShippingTimeTableInfo shippingTimeTableInfo : cropsCreateRequest.shippingTimeTableInfoList()) {
            ShippingTimeTable shippingTimeTable = ShippingTimeTable.builder()
                    .crops(crops)
                    .croppingTypeName(shippingTimeTableInfo.getCroppingTypeName())
                    .rowOrder(shippingTimeTableInfo.getRowOrder())
                    .columnOrder(shippingTimeTableInfo.getColumnOrder())
                    .attr(shippingTimeTableInfo.getAttr())
                    .value(shippingTimeTableInfo.getValue())
                    .build();
            shippingTimeTableRepository.save(shippingTimeTable);
        }
    }

    @Override
    public void createCropsVariety(CropsVarietyCreateRequest cropsVarietyCreateRequest) {
        Crops crops = cropsRepository.findById(cropsVarietyCreateRequest.cropsId()).orElseThrow(() -> new CropsException(CropsErrorCode.NO_EXIST_CROPS));
        CropsVarietyInfo cropsVarietyInfo = cropsVarietyCreateRequest.cropsVarietyInfo();
        CropsVariety cropsVariety = CropsVariety.builder()
                .crops(crops)
                .name(cropsVarietyInfo.getName())
                .category(cropsVarietyInfo.getCategory())
                .usage(cropsVarietyInfo.getUsage())
                .function(cropsVarietyInfo.getFunction())
                .characteristic(cropsVarietyInfo.getCharacteristic())
                .adaptationArea(cropsVarietyInfo.getAdaptationArea())
                .caution(cropsVarietyInfo.getCaution())
                .image(cropsVarietyInfo.getImage())
                .build();
        cropsVarietyRepository.save(cropsVariety);
    }

    @Override
    public List<CropsResponse> selectListCrops() {
        return cropsRepository.findAll().stream()
                .map(CropsResponse::from)
                .collect(Collectors.toList());
    }

}