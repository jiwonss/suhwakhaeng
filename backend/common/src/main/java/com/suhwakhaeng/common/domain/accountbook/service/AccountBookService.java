package com.suhwakhaeng.common.domain.accountbook.service;

import com.suhwakhaeng.common.domain.accountbook.dto.AccountBookCreateRequest;
import com.suhwakhaeng.common.domain.accountbook.dto.AccountBookDetailResponse;
import com.suhwakhaeng.common.domain.accountbook.dto.AccountBookListRequest;
import com.suhwakhaeng.common.domain.accountbook.dto.AccountBookResponse;

import java.util.List;

public interface AccountBookService {
    Long createAccountBook(Long userId, AccountBookCreateRequest request);

    AccountBookResponse selectAccountBook(Long userId, AccountBookListRequest request);

    AccountBookDetailResponse selectAccountBookDetail(Long accountBookId);

    void deleteAccountBook(Long accountBookId);
}
