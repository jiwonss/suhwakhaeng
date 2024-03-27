package com.suhwakhaeng.common.domain.accountbook.repository;

import com.suhwakhaeng.common.domain.accountbook.dto.AccountBookListRequest;
import com.suhwakhaeng.common.domain.accountbook.dto.AccountBookResponse;

import java.util.List;

public interface AccountBookCustomRepository {
    List<AccountBookResponse.Content> selectAccountBook(Long userId, AccountBookListRequest request);

}
