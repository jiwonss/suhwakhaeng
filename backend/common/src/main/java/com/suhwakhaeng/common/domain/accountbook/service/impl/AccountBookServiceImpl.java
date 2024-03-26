package com.suhwakhaeng.common.domain.accountbook.service.impl;

import com.suhwakhaeng.common.domain.accountbook.dto.AccountBookCreateRequest;
import com.suhwakhaeng.common.domain.accountbook.entity.AccountBook;
import com.suhwakhaeng.common.domain.accountbook.repository.AccountBookRepository;
import com.suhwakhaeng.common.domain.accountbook.service.AccountBookService;
import com.suhwakhaeng.common.domain.mycrops.entity.MyCrops;
import com.suhwakhaeng.common.domain.mycrops.service.MyCropsService;
import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.domain.user.exception.UserErrorCode;
import com.suhwakhaeng.common.domain.user.exception.UserException;
import com.suhwakhaeng.common.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AccountBookServiceImpl implements AccountBookService {
    private final AccountBookRepository accountBookRepository;
    private final UserRepository userRepository;
    private final MyCropsService myCropsService;

    @Override
    public Long createAccountBook(Long userId, AccountBookCreateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_EXIST_USER));

        MyCrops myCrops = myCropsService.selectMyCrop(request.myCropsId());

        AccountBook accountBook = request.toEntity();

        accountBook = accountBook.toBuilder()
                .user(user)
                .myCrops(myCrops)
                .build();

        accountBookRepository.save(accountBook);
        return accountBook.getId();
    }
}
