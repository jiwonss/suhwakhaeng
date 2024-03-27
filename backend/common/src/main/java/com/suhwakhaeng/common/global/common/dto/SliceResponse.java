package com.suhwakhaeng.common.global.common.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Slice;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SliceResponse<T> {
    private List<T> contents;
    private Boolean hasNext;

    public static <T> SliceResponse<T> of(Slice<T> items) {
        return new SliceResponse<>(items);
    }

    private SliceResponse(Slice<T> items) {
        this.contents = items.getContent();
        this.hasNext = items.hasNext();
    }
}