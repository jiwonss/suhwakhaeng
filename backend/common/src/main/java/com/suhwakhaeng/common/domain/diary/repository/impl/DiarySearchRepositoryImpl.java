package com.suhwakhaeng.common.domain.diary.repository.impl;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suhwakhaeng.common.domain.diary.dto.DiaryListResponse;
import com.suhwakhaeng.common.domain.diary.dto.DiarySelectRequest;
import com.suhwakhaeng.common.domain.diary.repository.DiarySearchRepository;
import com.suhwakhaeng.common.domain.mycrops.dto.MyCropsSimpleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import static com.suhwakhaeng.common.domain.diary.entity.QDiary.diary;
import static com.suhwakhaeng.common.domain.mycrops.entity.QMyCrops.myCrops;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

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
    public Map<LocalDate, List<DiaryListResponse>> searchDiaryList(Long userId, DiarySelectRequest diarySelectRequest) {
        BooleanBuilder searchOptions = getSearchOption(userId, diarySelectRequest);

        List<DiaryListResponse> result = queryFactory
                .select(Projections.constructor(
                        DiaryListResponse.class,
                        diary.id.as("diaryId"),
                        diary.content.as("diaryContent"),
                        diary.date.as("diaryDate"),
                        Projections.constructor(MyCropsSimpleResponse.class,
                                myCrops.id.as("myCropsId"),
                                myCrops.name.as("myCropsName")
                        ),
                        diary.memo.as("diaryMemo"),
                        diary.image.as("diaryImage"))
                )
                .from(diary)
                .leftJoin(myCrops).on(diary.myCrops.id.eq(myCrops.id))
                .where(searchOptions)
                .orderBy(diary.date.asc())
                .fetch();

        Map<LocalDate, List<DiaryListResponse>> diaryMap = new TreeMap<>();
        for (DiaryListResponse diaryResponse : result) {
            LocalDate date = diaryResponse.diaryDate();
            diaryMap.putIfAbsent(date, new ArrayList<>());
            diaryMap.get(date).add(diaryResponse);
        }

        return diaryMap.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (oldValue, newValue) -> oldValue, LinkedHashMap::new));
    }
}
