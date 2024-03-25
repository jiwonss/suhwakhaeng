package com.suhwakhaeng.common.domain.mycrops.repository.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suhwakhaeng.common.domain.crops.entity.QCrops;
import com.suhwakhaeng.common.domain.crops.entity.QCropsVariety;
import com.suhwakhaeng.common.domain.mycrops.dto.MyCropsResponse;
import com.suhwakhaeng.common.domain.mycrops.entity.QMyCrops;
import com.suhwakhaeng.common.domain.mycrops.repository.MyCropsCustomRepository;
import com.suhwakhaeng.common.domain.user.entity.QUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.suhwakhaeng.common.domain.crops.entity.QCrops.*;
import static com.suhwakhaeng.common.domain.crops.entity.QCropsVariety.*;
import static com.suhwakhaeng.common.domain.mycrops.entity.QMyCrops.*;
import static com.suhwakhaeng.common.domain.user.entity.QUser.*;

@Repository
@RequiredArgsConstructor
public class MyCropsCustomRepositoryImpl implements MyCropsCustomRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<MyCropsResponse> findMyCropsByUserId(Long userId) {
        return queryFactory.select(Projections.constructor(MyCropsResponse.class,
                        myCrops.id,
                        myCrops.name,
                        myCrops.cropsVariety.name,
                        cropsVariety.name,
                        myCrops.sido,
                        myCrops.gugun,
                        myCrops.dong
                ))
                .from(myCrops)
                .join(myCrops.cropsVariety, cropsVariety)
                .join(myCrops.user, user)
                .join(myCrops.cropsVariety.crops, crops)
                .where(user.id.eq(userId))
                .fetch();
    }
}
