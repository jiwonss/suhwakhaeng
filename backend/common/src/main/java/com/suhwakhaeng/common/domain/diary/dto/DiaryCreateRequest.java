package com.suhwakhaeng.common.domain.diary.dto;

import com.suhwakhaeng.common.domain.diary.entity.Diary;
import com.suhwakhaeng.common.domain.mycrops.entity.MyCrops;
import lombok.Builder;

@Builder
public record DiaryCreateRequest(
        Long myCropsId,
        String content,
        String memo,
        String image
) {
    public Diary toEntity() {
        return Diary.builder()
                .myCrops(MyCrops.builder().id(myCropsId).build())
                .memo(memo)
                .content(content)
                .image(image)
                .build();
    }
}
