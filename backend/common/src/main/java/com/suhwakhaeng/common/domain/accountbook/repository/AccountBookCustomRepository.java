package com.suhwakhaeng.common.domain.accountbook.repository;

import com.suhwakhaeng.common.domain.accountbook.dto.AccountBookListRequest;
import com.suhwakhaeng.common.domain.accountbook.dto.AccountBookListResponse;

import java.util.List;

public interface AccountBookCustomRepository {
    List<AccountBookListResponse.Content> selectAccountBook(Long userId, AccountBookListRequest request);

}
