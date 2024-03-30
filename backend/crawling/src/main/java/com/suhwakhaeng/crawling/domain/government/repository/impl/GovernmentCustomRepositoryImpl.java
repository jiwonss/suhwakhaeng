package com.suhwakhaeng.crawling.domain.government.repository.impl;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suhwakhaeng.crawling.domain.government.dto.GovernmentInfo;
import com.suhwakhaeng.crawling.domain.government.dto.GovernmentSearchRequest;
import com.suhwakhaeng.crawling.domain.government.dto.GovernmentSliceResponse;
import com.suhwakhaeng.crawling.domain.government.repository.GovernmentCustomRepository;
import com.suhwakhaeng.crawling.global.util.NullSafeBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.suhwakhaeng.crawling.domain.government.entity.QGovernment.*;

@Repository
@RequiredArgsConstructor
public class GovernmentCustomRepositoryImpl implements GovernmentCustomRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public GovernmentSliceResponse selectGovernment(GovernmentSearchRequest request, Pageable pageable) {
        List<GovernmentInfo> data = queryFactory
                .select(Projections.constructor(GovernmentInfo.class,
                        government.id,
                        government.title,
                        government.url,
                        government.area,
                        government.date
                ))
                .from(government)
                .where(
                        containsKeyword(request.keyword()),
                        equalsArea(request.area())
                )
                .orderBy(government.date.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1)
                .fetch();


        Boolean hasNext = hasNext(data, pageable.getPageSize());

        return new GovernmentSliceResponse(hasNext, data);
    }

    private <T> boolean hasNext(List<T> data, int limit) {
        if (data.size() > limit) {
            data.remove(limit);
            return true;
        }

        return false;
    }

    private BooleanBuilder containsKeyword(final String keyword) {
        return titleContainsKeyword(keyword).or(areaContainsKeyword(keyword));
    }

    private BooleanBuilder titleContainsKeyword(final String keyword) {
        return NullSafeBuilder.build(() -> government.title.like("%" + keyword + "%"));
    }

    private BooleanBuilder areaContainsKeyword(final String keyword) {
        return NullSafeBuilder.build(() -> government.area.like("%" + keyword + "%"));
    }

    private BooleanBuilder equalsArea(final String area) {
        return NullSafeBuilder.build(() -> government.area.like("%" + area + "%"));
    }
}
