package com.suhwakhaeng.common.domain.crops.repository.impl;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suhwakhaeng.common.domain.crops.dto.CropsListResponse;
import com.suhwakhaeng.common.domain.crops.repository.CropsSearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.suhwakhaeng.common.domain.crops.entity.QCrops.crops;

@Repository
@RequiredArgsConstructor
public class CropsSearchRepositoryImpl implements CropsSearchRepository {

    private final JPAQueryFactory jpaQueryFactory;

    private BooleanBuilder getSearchOption(String keyword) {
        BooleanBuilder searchOptions = new BooleanBuilder();
        if (keyword != null) {
            searchOptions.and(crops.name.contains(keyword));
        }
        return searchOptions;
    }

    @Override
    public List<CropsListResponse> searchCrops(String keyword) {
        BooleanBuilder searchOptions = getSearchOption(keyword);
        return jpaQueryFactory
                .select(
                        Projections.constructor(CropsListResponse.class,
                                crops.id.as("id"),
                                crops.name.as("name")
                        )
                )
                .from(crops)
                .where(searchOptions)
                .fetch();
    }
}
