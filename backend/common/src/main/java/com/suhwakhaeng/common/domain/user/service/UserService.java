package com.suhwakhaeng.common.domain.user.service;

import com.suhwakhaeng.common.domain.user.dto.BusinessResponse;
import com.suhwakhaeng.common.domain.user.dto.LogoutRequest;
import com.suhwakhaeng.common.domain.user.dto.ProfileResponse;
import com.suhwakhaeng.common.domain.user.dto.UserInfoResponse;
import com.suhwakhaeng.common.domain.user.entity.User;

import java.util.List;

public interface UserService {
    ProfileResponse selectDetailUser(Long userId);
    UserInfoResponse selectDetailUserInfo(Long userId);
    Long updateUser(Long userId, User user);
    void logout(Long userId, LogoutRequest request);
    void withdraw(Long userId);
}
