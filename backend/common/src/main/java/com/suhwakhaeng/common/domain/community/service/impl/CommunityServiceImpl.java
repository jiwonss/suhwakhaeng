package com.suhwakhaeng.common.domain.community.service.impl;

import com.suhwakhaeng.common.domain.community.repository.CommunitiyRepository;
import com.suhwakhaeng.common.domain.community.service.CommunityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommunityServiceImpl implements CommunityService {
    private final CommunitiyRepository communitiyRepository;


}
