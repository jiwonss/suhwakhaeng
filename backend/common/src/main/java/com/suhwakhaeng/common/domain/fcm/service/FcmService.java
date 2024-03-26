package com.suhwakhaeng.common.domain.fcm.service;

import com.suhwakhaeng.common.domain.fcm.dto.FcmAllRequest;
import com.suhwakhaeng.common.domain.fcm.dto.FcmSubscribeRequest;
import com.suhwakhaeng.common.domain.fcm.dto.FcmTokenRequest;
import com.suhwakhaeng.common.domain.fcm.dto.FcmTopicRequest;

public interface FcmService {
    void sendMessageByTopic(FcmTopicRequest fcmTopicRequest);
    void sendMessageByToken(FcmTokenRequest fcmTokenRequest);
    void createDeviceToken(Long userId, String deviceToken);
    void sendMessageAll(FcmAllRequest fcmAllRequest);
    void subscribeByTopic(FcmSubscribeRequest fcmSubscribeRequest);
    void deleteDeviceToken(String deviceToken);
}
