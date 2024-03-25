package com.suhwakhaeng.common.domain.diary.repository.impl;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suhwakhaeng.common.domain.diary.dto.DiaryListResponse;
import com.suhwakhaeng.common.domain.diary.dto.DiarySelectRequest;
import com.suhwakhaeng.common.domain.diary.repository.DiarySearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import static com.suhwakhaeng.common.domain.diary.entity.QDiary.diary;
import static com.suhwakhaeng.common.domain.mycrops.entity.QMyCrops.myCrops;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class DiarySearchRepositoryImpl implements DiarySearchRepository {
    private final JPAQueryFactory queryFactory;

    private BooleanBuilder getSearchOption(Long userId, DiarySelectRequest diarySelectRequest){
        BooleanBuilder searchOptions = new BooleanBuilder();
        searchOptions.and(myCrops.user.id.eq(userId));
        searchOptions.and(diary.date.between(diarySelectRequest.startDate(), diarySelectRequest.finDate()));
        if(diarySelectRequest.myCropId() != null && diarySelectRequest.myCropId() != 0) {
            searchOptions.and(myCrops.id.eq(diarySelectRequest.myCropId()));
        }
        return searchOptions;
    }

    @Override
    public List<DiaryListResponse> searchDiaryList(Long userId, DiarySelectRequest diarySelectRequest) {
        BooleanBuilder searchOptions = getSearchOption(userId, diarySelectRequest);
        return queryFactory
                .select(
                        Projections.constructor(DiaryListResponse.class
                                , diary.id.as("diaryId")
                                , diary.content.as("diaryContent")
                                , diary.date.as("diaryDate")
                                , diary.myCrops.as("myCrops")
                                , diary.memo.as("diaryMemo")
                                , diary.image.as("diaryImage")
                        )
                )
                .from(diary)
                .leftJoin(myCrops).on(diary.myCrops.id.eq(myCrops.id))
                .where(searchOptions)
                .orderBy(diary.date.asc())
                .fetch();
    }
}
