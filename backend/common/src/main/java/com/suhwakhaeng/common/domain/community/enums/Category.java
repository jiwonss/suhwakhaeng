package com.suhwakhaeng.common.domain.community.enums;

import com.suhwakhaeng.common.domain.community.exception.CommunityErrorCode;
import com.suhwakhaeng.common.domain.community.exception.CommunityException;
import com.suhwakhaeng.common.domain.mycrops.enums.AreaUnit;
import lombok.AllArgsConstructor;

import java.lang.reflect.Array;
import java.util.Arrays;

import static com.suhwakhaeng.common.domain.community.exception.CommunityErrorCode.*;

@AllArgsConstructor
public enum Category {
    // ENUM(질문,나눔,꿀팁,자유)

    QUESTION("질문"),
    SHARE("나눔"),
    TIP("꿀팁"),
    FREEDOM("자유");

    private String name;

    public static Category fromName(String name) {
        return Arrays.stream(values())
                .filter(category -> category.name.equals(name))
                .findAny().orElseThrow(() -> new CommunityException(NOT_EXIST_CATEGORY));
    }
}
