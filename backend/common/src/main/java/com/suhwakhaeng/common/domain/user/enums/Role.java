package com.suhwakhaeng.common.domain.user.enums;

import com.suhwakhaeng.common.domain.user.exception.UserErrorCode;
import com.suhwakhaeng.common.domain.user.exception.UserException;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum Role {
    ADMIN("관리자"),
    USER("소비자"),
    FARMER("농부"),
    BUISNESS("사업자");

    private final String name;

    public static Role findRole(String name) {
        return Arrays.stream(values())
                .filter(role -> role.name.equals(name))
                .findAny().orElse(Role.USER);
    }
}
