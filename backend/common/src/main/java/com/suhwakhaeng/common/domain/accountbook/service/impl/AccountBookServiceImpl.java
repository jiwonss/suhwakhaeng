package com.suhwakhaeng.common.domain.accountbook.service.impl;

import com.suhwakhaeng.common.domain.accountbook.dto.AccountBookCreateRequest;
import com.suhwakhaeng.common.domain.accountbook.dto.AccountBookDetailResponse;
import com.suhwakhaeng.common.domain.accountbook.dto.AccountBookListRequest;
import com.suhwakhaeng.common.domain.accountbook.dto.AccountBookResponse;
import com.suhwakhaeng.common.domain.accountbook.entity.AccountBook;
import com.suhwakhaeng.common.domain.accountbook.enums.Finance;
import com.suhwakhaeng.common.domain.accountbook.exception.AccountBookErrorCode;
import com.suhwakhaeng.common.domain.accountbook.exception.AccountBookException;
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

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AccountBookServiceImpl implements AccountBookService {
    private final AccountBookRepository accountBookRepository;
    private final UserRepository userRepository;
    private final MyCropsService myCropsService;

    @Transactional
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

    @Override
    public AccountBookResponse selectAccountBook(Long userId, AccountBookListRequest request) {
        List<AccountBookResponse.Content> contents = accountBookRepository.selectAccountBook(userId, request);

        return new AccountBookResponse(contents);
    }

    @Override
    public AccountBookDetailResponse selectAccountBookDetail(Long accountBookId) {
        AccountBook accountBook = accountBookRepository.findById(accountBookId)
                .orElseThrow(() -> new AccountBookException(AccountBookErrorCode.NOT_EXIST_ACCOUNT_BOOK));

        return AccountBookDetailResponse.builder()
                .finance(accountBook.getFinance())
                .myCropsName(accountBook.getMyCrops().getName())
                .title(accountBook.getTitle())
                .amount(accountBook.getAmount())
                .content(accountBook.getContent())
                .image(accountBook.getImage())
                .build();
    }

    @Transactional
    @Override
    public void deleteAccountBook(Long accountBookId) {
        accountBookRepository.deleteById(accountBookId);
    }
}
