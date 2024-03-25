package com.suhwakhaeng.common.domain.diary.repository;

import com.suhwakhaeng.common.domain.diary.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
}
