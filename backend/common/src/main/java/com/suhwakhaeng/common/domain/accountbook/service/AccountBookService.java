package com.suhwakhaeng.common.domain.accountbook.service;

import com.suhwakhaeng.common.domain.accountbook.dto.AccountBookCreateRequest;
import com.suhwakhaeng.common.domain.accountbook.dto.AccountBookDetailResponse;
import com.suhwakhaeng.common.domain.accountbook.dto.AccountBookListRequest;
import com.suhwakhaeng.common.domain.accountbook.dto.AccountBookListResponse;

public interface AccountBookService {
    Long createAccountBook(Long userId, AccountBookCreateRequest request);

    AccountBookListResponse selectAccountBook(Long userId, AccountBookListRequest request);

    AccountBookDetailResponse selectAccountBookDetail(Long accountBookId);

    void deleteAccountBook(Long accountBookId);
}
