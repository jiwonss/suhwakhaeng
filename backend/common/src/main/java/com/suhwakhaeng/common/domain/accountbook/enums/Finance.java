package com.suhwakhaeng.common.domain.accountbook.enums;

import com.suhwakhaeng.common.domain.accountbook.exception.AccountBookErrorCode;
import com.suhwakhaeng.common.domain.accountbook.exception.AccountBookException;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum Finance {
    INCOME("수입"), 
    EXPENDITURE("지출");

    private String name;

    public static Finance fromName(String name) {
        return Arrays.stream(values())
                .filter(finance -> finance.name.equals(name))
                .findAny()
                .orElseThrow(() -> new AccountBookException(AccountBookErrorCode.NOT_EXIST_FINANCE));
    }
}
