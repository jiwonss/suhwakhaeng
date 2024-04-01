package com.suhwakhaeng.common.domain.user.repository.impl;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suhwakhaeng.common.domain.user.dto.BusinessResponse;
import com.suhwakhaeng.common.domain.user.entity.QBusiness;
import com.suhwakhaeng.common.domain.user.entity.QUser;
import com.suhwakhaeng.common.domain.user.repository.BusinessCustomRepository;
import com.suhwakhaeng.common.global.util.NullSafeBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.suhwakhaeng.common.domain.community.entity.QCommunity.community;
import static com.suhwakhaeng.common.domain.user.entity.QBusiness.*;
import static com.suhwakhaeng.common.domain.user.entity.QUser.*;

@Repository
@RequiredArgsConstructor
public class BusinessCustomRepositoryImpl implements BusinessCustomRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<BusinessResponse> selectBusiness(Long lastId) {
        return queryFactory
                .select(Projections.constructor(
                                BusinessResponse.class,
                                user.id,
                                user.nickname,
                                business.id,
                                business.image,
                                business.isAccepted
                        )
                )
                .from(business)
                .join(business.user, user)
                .where(isGreaterThan(lastId), isNotAccepted())
                .orderBy(business.id.desc())
                .limit(10)
                .fetch();
    }

    private BooleanBuilder isNotAccepted() {
        return NullSafeBuilder.build(() -> business.isAccepted.eq(false));
    }

    private BooleanBuilder isGreaterThan(final Long lastId) {
        return NullSafeBuilder.build(() -> business.id.gt(lastId));
    }
}
