package com.suhwakhaeng.common.domain.user.repository;

import com.suhwakhaeng.common.domain.user.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String> {
    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM RefreshToken r WHERE r.expirationDate < :currentDateTime")
    void deleteByExpirationDate(LocalDateTime currentDateTime);

    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM RefreshToken r WHERE r.user.id = :userId")
    void deleteByUserId(Long userId);
}
