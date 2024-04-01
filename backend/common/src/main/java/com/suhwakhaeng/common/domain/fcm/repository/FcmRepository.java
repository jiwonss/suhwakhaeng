package com.suhwakhaeng.common.domain.fcm.repository;

import com.suhwakhaeng.common.domain.fcm.entity.DeviceToken;
import com.suhwakhaeng.common.domain.user.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FcmRepository extends JpaRepository<DeviceToken, String> {
    @Query("SELECT dt.token FROM DeviceToken dt WHERE dt.user = :user")
    Optional<List<String>> findTokenAllByUser(@Param("user") User user);
    @Query("SELECT dt.token FROM DeviceToken dt")
    Optional<List<String>> findTokenAll();

    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM DeviceToken d WHERE d.user.id = :userId")
    void deleteByUserId(Long userId);
}
