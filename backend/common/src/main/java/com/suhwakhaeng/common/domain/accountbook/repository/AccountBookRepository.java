package com.suhwakhaeng.common.domain.accountbook.repository;

import com.suhwakhaeng.common.domain.accountbook.entity.AccountBook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountBookRepository extends JpaRepository<AccountBook, Long>, AccountBookCustomRepository {

}
