package com.suhwakhaeng.common.domain.user.service.impl;

import com.suhwakhaeng.common.domain.user.dto.ProfileResponse;
import com.suhwakhaeng.common.domain.user.dto.UserInfoResponse;
import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.domain.user.repository.UserRepository;
import com.suhwakhaeng.common.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    @Override
    public ProfileResponse selectDetailUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException());
        return ProfileResponse.fromUser(user);
    }

    @Transactional(readOnly = true)
    @Override
    public UserInfoResponse selectDetailUserInfo(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException());
        return UserInfoResponse.fromUser(user);
    }
}
