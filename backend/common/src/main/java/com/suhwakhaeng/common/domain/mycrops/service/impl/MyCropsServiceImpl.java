package com.suhwakhaeng.common.domain.mycrops.service.impl;

import com.suhwakhaeng.common.domain.mycrops.repository.MyCropsRepository;
import com.suhwakhaeng.common.domain.mycrops.service.MyCropsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MyCropsServiceImpl implements MyCropsService {
    private final MyCropsRepository myCropsRepository;

}
