package com.suhwakhaeng.common.domain.accountbook.repository.impl;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suhwakhaeng.common.domain.accountbook.dto.AccountBookListRequest;
import com.suhwakhaeng.common.domain.accountbook.dto.AccountBookListResponse;
import com.suhwakhaeng.common.domain.accountbook.repository.AccountBookCustomRepository;
import com.suhwakhaeng.common.domain.mycrops.dto.MyCropsSimpleResponse;
import com.suhwakhaeng.common.global.util.NullSafeBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import static com.suhwakhaeng.common.domain.accountbook.entity.QAccountBook.*;
import static com.suhwakhaeng.common.domain.mycrops.entity.QMyCrops.*;

@Repository
@RequiredArgsConstructor
public class AccountBookCustomRepositoryImpl implements AccountBookCustomRepository {
    private final JPAQueryFactory queryFactory;
    @Override
    public List<AccountBookListResponse.Content> selectAccountBook(Long userId, AccountBookListRequest request) {
        return queryFactory.select(Projections.constructor(
                        AccountBookListResponse.Content.class,
                        accountBook.id,
                        Projections.constructor(
                                MyCropsSimpleResponse.class,
                                myCrops.id,
                                myCrops.name
                        ),
                        accountBook.title,
                        accountBook.amount,
                        accountBook.finance,
                        accountBook.date
                ))
                .from(accountBook)
                .join(accountBook.myCrops, myCrops)
                .where(
                        equalsUser(userId)
                                .and(betweenDate(request.startDate(), request.endDate()))
                                .and(equalsMyCrops(request.myCropsId()))


                )
                .orderBy(accountBook.date.desc())
                .fetch();
    }

    private BooleanBuilder equalsUser(final Long userId) {
        return NullSafeBuilder.build(() -> accountBook.user.id.eq(userId));
    }

    private BooleanBuilder betweenDate(final LocalDate startDate, final LocalDate endDate) {
        return NullSafeBuilder.build(() -> accountBook.date.between(startDate, endDate));
    }

    private BooleanBuilder equalsMyCrops(final Long myCropsId) {
        if (myCropsId == null || myCropsId == 0) {
            return new BooleanBuilder();
        }

        return NullSafeBuilder.build(() -> myCrops.id.eq(myCropsId));
    }

}
