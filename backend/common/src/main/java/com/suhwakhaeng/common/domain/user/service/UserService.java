package com.suhwakhaeng.common.domain.user.service;

import com.suhwakhaeng.common.domain.user.dto.ProfileResponse;
import com.suhwakhaeng.common.domain.user.dto.UserInfoResponse;

public interface UserService {
    ProfileResponse selectDetailUser(Long userId);

    UserInfoResponse selectDetailUserInfo(Long userId);

}
