package com.suhwakhaeng.common.domain.accountbook.service;

import com.suhwakhaeng.common.domain.accountbook.dto.AccountBookCreateRequest;

public interface AccountBookService {
    Long createAccountBook(Long userId, AccountBookCreateRequest request);
}
