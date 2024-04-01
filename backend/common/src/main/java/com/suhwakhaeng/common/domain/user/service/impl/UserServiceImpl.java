package com.suhwakhaeng.common.domain.user.service.impl;

import com.suhwakhaeng.common.domain.fcm.repository.FcmRepository;
import com.suhwakhaeng.common.domain.user.dto.BusinessResponse;
import com.suhwakhaeng.common.domain.user.dto.LogoutRequest;
import com.suhwakhaeng.common.domain.user.dto.ProfileResponse;
import com.suhwakhaeng.common.domain.user.dto.UserInfoResponse;
import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.domain.user.exception.UserErrorCode;
import com.suhwakhaeng.common.domain.user.exception.UserException;
import com.suhwakhaeng.common.domain.user.repository.BusinessRepository;
import com.suhwakhaeng.common.domain.user.repository.RefreshTokenRepository;
import com.suhwakhaeng.common.domain.user.repository.UserRepository;
import com.suhwakhaeng.common.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static com.suhwakhaeng.common.domain.user.exception.UserErrorCode.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final FcmRepository fcmRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public ProfileResponse selectDetailUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(NOT_EXIST_USER));
        return ProfileResponse.fromUser(user);
    }

    @Override
    public UserInfoResponse selectDetailUserInfo(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(NOT_EXIST_USER));
        return UserInfoResponse.fromUser(user);
    }

    @Transactional
    @Override
    public Long updateUser(Long userId, User user) {
        User targetUser = userRepository.findById(userId).orElseThrow(() -> new UserException(NOT_EXIST_USER));
        targetUser.updateProfile(user);
        return targetUser.getId();
    }

    @Transactional
    @Override
    public void logout(Long userId, LogoutRequest request) {
        fcmRepository.deleteById(request.deviceToken());
        refreshTokenRepository.deleteById(request.refreshToken());
    }

    @Scheduled(cron = "0 0 3 * * *")
    private void deletePastExpirationDate() {
        refreshTokenRepository.deleteByExpirationDate(LocalDateTime.now());
    }

    @Transactional
    @Override
    public void withdraw(Long userId) {
        // 연관된 device token 지우기
        fcmRepository.deleteByUserId(userId);

        // 연관된 refresh token 지우기
        refreshTokenRepository.deleteByUserId(userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException(NOT_EXIST_USER));
        // user 상태 변경하기
        user.withdraw();
    }
}
