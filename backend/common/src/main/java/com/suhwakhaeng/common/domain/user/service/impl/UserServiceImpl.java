package com.suhwakhaeng.common.domain.user.service.impl;

import com.suhwakhaeng.common.domain.user.dto.ProfileResponse;
import com.suhwakhaeng.common.domain.user.dto.UserInfoResponse;
import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.domain.user.exception.UserErrorCode;
import com.suhwakhaeng.common.domain.user.exception.UserException;
import com.suhwakhaeng.common.domain.user.repository.UserRepository;
import com.suhwakhaeng.common.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.suhwakhaeng.common.domain.user.exception.UserErrorCode.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

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
}
