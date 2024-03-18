package com.suhwakhaeng.common.domain.user.service;

import com.suhwakhaeng.common.domain.user.dto.ProfileResponse;

public interface UserService {
    ProfileResponse selectDetailUser(Long userId);

}
