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
    QUESTION, SHARE, TIP, FREEDOM,
}
