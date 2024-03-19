package com.suhwakhaeng.common.domain.crops.service.impl;

import com.suhwakhaeng.common.domain.crops.dto.CropsCreateRequest;
import com.suhwakhaeng.common.domain.crops.dto.CropsVarietyCreateRequest;
import com.suhwakhaeng.common.domain.crops.entity.Crops;
import com.suhwakhaeng.common.domain.crops.entity.CropsVariety;
import com.suhwakhaeng.common.domain.crops.entity.CultivationCharacteristic;
import com.suhwakhaeng.common.domain.crops.entity.ShippingTimeTable;
import com.suhwakhaeng.common.domain.crops.enums.CropsCate;
import com.suhwakhaeng.common.domain.crops.repository.CropsRepository;
import com.suhwakhaeng.common.domain.crops.repository.CropsVarietyRepository;
import com.suhwakhaeng.common.domain.crops.repository.CultivationCharacteristicRepository;
import com.suhwakhaeng.common.domain.crops.repository.ShippingTimeTableRepository;
import com.suhwakhaeng.common.domain.crops.service.CropsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
            CultivationCharacteristic cultivationCharacteristic = CultivationCharacteristic.builder()
                    .crops(crops)
                    .scientificName(cropsCreateRequest.cultivationCharacteristicInfo().getScientificName())
                    .classification(cropsCreateRequest.cultivationCharacteristicInfo().getClassification())
                    .physiologicalCharacteristic(cropsCreateRequest.cultivationCharacteristicInfo().getPhysiologicalCharacteristic())
                    .mainTech(cropsCreateRequest.cultivationCharacteristicInfo().getMainTech())
                    .build();
            cultivationCharacteristicRepository.save(cultivationCharacteristic);
        }

        // 작형별 출하시기 표
        ShippingTimeTable shippingTimeTable = ShippingTimeTable.builder()
                .crops(crops)
                .croppingTypeName(cropsCreateRequest.shippingTimeTableInfo().getCroppingTypeName())
                .rowOrder(cropsCreateRequest.shippingTimeTableInfo().getRowOrder())
                .columnOrder(cropsCreateRequest.shippingTimeTableInfo().getColumnOrder())
                .attr(cropsCreateRequest.shippingTimeTableInfo().getAttr())
                .value(cropsCreateRequest.shippingTimeTableInfo().getValue())
                .build();
        shippingTimeTableRepository.save(shippingTimeTable);
    }

    @Override
    public void createCropsVariety(CropsVarietyCreateRequest cropsVarietyCreateRequest) {
        Crops crops = cropsRepository.findById(cropsVarietyCreateRequest.cropsId()).orElseThrow();

        CropsVariety cropsVariety = CropsVariety.builder()
                .crops(crops)
                .name(cropsVarietyCreateRequest.cropsVarietyInfo().getName())
                .category(cropsVarietyCreateRequest.cropsVarietyInfo().getCategory())
                .usage(cropsVarietyCreateRequest.cropsVarietyInfo().getUsage())
                .function(cropsVarietyCreateRequest.cropsVarietyInfo().getFunction())
                .characteristic(cropsVarietyCreateRequest.cropsVarietyInfo().getCharacteristic())
                .adaptationArea(cropsVarietyCreateRequest.cropsVarietyInfo().getAdaptationArea())
                .caution(cropsVarietyCreateRequest.cropsVarietyInfo().getCaution())
                .image(cropsVarietyCreateRequest.cropsVarietyInfo().getImage())
                .build();
        cropsVarietyRepository.save(cropsVariety);
    }
}