package com.suhwakhaeng.common.domain.crops.repository.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suhwakhaeng.common.domain.crops.dto.*;
import com.suhwakhaeng.common.domain.crops.repository.CropsDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.suhwakhaeng.common.domain.crops.entity.QCrops.crops;
import static com.suhwakhaeng.common.domain.crops.entity.QCropsVariety.cropsVariety;
import static com.suhwakhaeng.common.domain.crops.entity.QCultivationCharacteristic.cultivationCharacteristic;
import static com.suhwakhaeng.common.domain.crops.entity.QShippingTimeTable.shippingTimeTable;
import static com.suhwakhaeng.common.domain.crops.entity.QShippingTimeTableValue.shippingTimeTableValue;

@Repository
@RequiredArgsConstructor
public class CropsDetailRepositoryImpl implements CropsDetailRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public CropsDetailResponse selectDetailCrops(Long cropsId, Long cropsVarietyId) {
        return jpaQueryFactory
                .select(
                        Projections.fields(CropsDetailResponse.class,
                                Projections.constructor(CropsInfo.class,
                                        crops.id.as("crops_id"),
                                        crops.name.as("crops_name"),
                                        crops.category.as("crops_category"),
                                        crops.growingCondition.as("crops_growingCondition"),
                                        crops.diseaseType.as("crops_diseaseType"),
                                        crops.pestType.as("crops_pestType")
                                ).as("cropsInfo"),
                                Projections.constructor(CropsVarietyInfo.class,
                                        cropsVariety.id.as("cropsVariety_id"),
                                        cropsVariety.name.as("cropsVariety_name"),
                                        cropsVariety.category.as("cropsVariety_category"),
                                        cropsVariety.usage.as("cropsVariety_usage"),
                                        cropsVariety.function.as("cropsVariety_function"),
                                        cropsVariety.characteristic.as("cropsVariety_characteristic"),
                                        cropsVariety.adaptationArea.as("cropsVariety_adaptationArea"),
                                        cropsVariety.caution.as("cropsVariety_caution"),
                                        cropsVariety.image.as("cropsVariety_image")
                                ).as("cropsVarietyInfo"),
                                Projections.constructor(TableInfo.class,
                                        shippingTimeTable.id.as("shippingTimeTable_id"),
                                        shippingTimeTable.tableHead.as("tableHead"),
                                        shippingTimeTable.tableTitle.as("tableTitle")
                                ).as("tableInfo")
                        )
                )
                .from(crops)
                .join(cropsVariety).on(crops.id.eq(cropsVariety.crops.id))
                .join(shippingTimeTable).on(crops.id.eq(shippingTimeTable.crops.id))
                .where(crops.id.eq(cropsId), cropsVariety.id.eq(cropsVarietyId))
                .fetchOne();
    }

    @Override
    public CropsDetailResponse selectDetailNotCrops(Long cropsId, Long cropsVarietyId) {
        return jpaQueryFactory
                .select(
                        Projections.fields(CropsDetailResponse.class,
                                Projections.constructor(CropsInfo.class,
                                        crops.id.as("crops_id"),
                                        crops.name.as("crops_name"),
                                        crops.category.as("crops_category"),
                                        crops.growingCondition.as("crops_growingCondition"),
                                        crops.diseaseType.as("crops_diseaseType"),
                                        crops.pestType.as("crops_pestType")
                                ).as("cropsInfo"),
                                Projections.constructor(CultivationCharacteristicInfo.class,
                                        cultivationCharacteristic.id.as("cultivationCharacteristic_id"),
                                        cultivationCharacteristic.scientificName.as("cultivationCharacteristic_scientificName"),
                                        cultivationCharacteristic.classification.as("cultivationCharacteristic_classification"),
                                        cultivationCharacteristic.physiologicalCharacteristic.as("cultivationCharacteristic_physiologicalCharacteristic"),
                                        cultivationCharacteristic.mainTech.as("cultivationCharacteristic_mainTech")
                                ).as("cultivationCharacteristicInfo"),
                                Projections.constructor(CropsVarietyInfo.class,
                                        cropsVariety.id.as("cropsVariety_id"),
                                        cropsVariety.name.as("cropsVariety_name"),
                                        cropsVariety.category.as("cropsVariety_category"),
                                        cropsVariety.usage.as("cropsVariety_usage"),
                                        cropsVariety.function.as("cropsVariety_function"),
                                        cropsVariety.characteristic.as("cropsVariety_characteristic"),
                                        cropsVariety.adaptationArea.as("cropsVariety_adaptationArea"),
                                        cropsVariety.caution.as("cropsVariety_caution"),
                                        cropsVariety.image.as("cropsVariety_image")
                                ).as("cropsVarietyInfo"),
                                Projections.constructor(TableInfo.class,
                                        shippingTimeTable.id.as("shippingTimeTable_id"),
                                        shippingTimeTable.tableHead.as("tableHead"),
                                        shippingTimeTable.tableTitle.as("tableTitle")
                                ).as("tableInfo")
                        )
                )
                .from(crops)
                .join(cultivationCharacteristic).on(crops.id.eq(cultivationCharacteristic.crops.id))
                .join(cropsVariety).on(crops.id.eq(cropsVariety.crops.id))
                .join(shippingTimeTable).on(crops.id.eq(shippingTimeTable.crops.id))
                .where(crops.id.eq(cropsId), cropsVariety.id.eq(cropsVarietyId))
                .fetchOne();
    }

    @Override
    public List<String> selectDetailCropsShippingTimeTable(int rowIdx, int columnCnt, Long shippingTimeTableId) {
        return jpaQueryFactory
                .select(
                        shippingTimeTableValue.value.as("value")
                )
                .from(shippingTimeTable)
                .join(shippingTimeTableValue).on(shippingTimeTable.id.eq(shippingTimeTableValue.shippingTimeTable.id))
                .where(shippingTimeTable.id.eq(shippingTimeTableId), shippingTimeTableValue.rowOrder.eq(rowIdx))
                .orderBy(shippingTimeTableValue.columnOrder.asc())
                .limit(columnCnt)
                .fetch();
    }
}
