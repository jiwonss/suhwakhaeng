package com.suhwakhaeng.common.domain.accountbook.controller;

import com.suhwakhaeng.common.domain.accountbook.dto.AccountBookCreateRequest;
import com.suhwakhaeng.common.domain.accountbook.dto.AccountBookListRequest;
import com.suhwakhaeng.common.domain.accountbook.service.AccountBookService;
import com.suhwakhaeng.common.global.common.annotation.CustomPreAuthorize;
import com.suhwakhaeng.common.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/account-book")
public class AccountBookController {
    private final AccountBookService accountBookService;

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @PostMapping
    public ResponseEntity createAccountBook(@RequestHeader("X-Authorization-Id") Long userId,
                                            @Validated @RequestBody AccountBookCreateRequest request) {
        accountBookService.createAccountBook(userId, request);
        return ResponseEntity.ok().body(Message.success());
    }

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @GetMapping
    public ResponseEntity selectAccountBook(@RequestHeader("X-Authorization-Id") Long userId,
                                            AccountBookListRequest request) {
        return ResponseEntity.ok().body(Message.success(accountBookService.selectAccountBook(userId, request)));
    }

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @GetMapping("/{accountBookId}")
    public ResponseEntity selectAccountBookDetail(@PathVariable Long accountBookId) {
        return ResponseEntity.ok().body(Message.success(accountBookService.selectAccountBookDetail(accountBookId)));
    }

    @CustomPreAuthorize({"USER","ADMIN","BUISNESS","FARMER"})
    @DeleteMapping("/{accountBookId}")
    public ResponseEntity deleteAccountBook(@PathVariable Long accountBookId) {
        accountBookService.deleteAccountBook(accountBookId);
        return ResponseEntity.ok().body(Message.success());
    }
}
