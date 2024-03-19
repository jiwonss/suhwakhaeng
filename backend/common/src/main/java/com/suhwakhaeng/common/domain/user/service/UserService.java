package com.suhwakhaeng.common.domain.user.service;

import com.suhwakhaeng.common.domain.user.dto.ProfileResponse;
import com.suhwakhaeng.common.domain.user.dto.UserInfoResponse;
import com.suhwakhaeng.common.domain.user.entity.User;

public interface UserService {
    ProfileResponse selectDetailUser(Long userId);

    UserInfoResponse selectDetailUserInfo(Long userId);

    Long updateUser(Long userId, User user);

}
