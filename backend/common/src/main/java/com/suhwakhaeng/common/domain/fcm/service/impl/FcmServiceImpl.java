package com.suhwakhaeng.common.domain.fcm.service.impl;


import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.*;
import com.suhwakhaeng.common.domain.fcm.dto.FcmAllRequest;
import com.suhwakhaeng.common.domain.fcm.dto.FcmSubscribeRequest;
import com.suhwakhaeng.common.domain.fcm.dto.FcmTokenRequest;
import com.suhwakhaeng.common.domain.fcm.dto.FcmTopicRequest;
import com.suhwakhaeng.common.domain.fcm.entity.DeviceToken;
import com.suhwakhaeng.common.domain.fcm.exception.FcmErrorCode;
import com.suhwakhaeng.common.domain.fcm.exception.FcmException;
import com.suhwakhaeng.common.domain.fcm.repository.FcmRepository;
import com.suhwakhaeng.common.domain.fcm.service.FcmService;
import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class FcmServiceImpl implements FcmService {
    private final FcmRepository fcmRepository;
    private final UserRepository userRepository;
    // 비밀키 경로 환경 변수
    @Value("${fcm.service-account-file}") private String serviceAccountFilePath;
    // 프로젝트 아이디 환경 변수
    @Value("${fcm.project-id}") private String projectId;

    // 의존성 주입이 이루어진 후 초기화를 수행한다.
    @PostConstruct
    public void initialize() {
        FirebaseOptions options = null;
        try {
            options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(new ClassPathResource(serviceAccountFilePath).getInputStream()))
                    .setProjectId(projectId)
                    .build();
        } catch (IOException e) {
            throw new FcmException(FcmErrorCode.INIT_FAIL);
        }

        FirebaseApp.initializeApp(options);
    }

    @Override
    public void subscribeByTopic(FcmSubscribeRequest fcmSubscribeRequest) {
        try {
            FirebaseMessaging.getInstance().subscribeToTopic(Collections.singletonList(fcmSubscribeRequest.token()), fcmSubscribeRequest.topic());
        } catch (FirebaseMessagingException e) {
            throw new FcmException(FcmErrorCode.SUBSCRIBE_FAIL);
        }
    }

    // 지정된 topic에 fcm를 보냄
    @Override
    public void sendMessageByTopic(FcmTopicRequest fcmTopicRequest) {
        try {
            FirebaseMessaging.getInstance().send(Message.builder()
                    .setNotification(Notification.builder()
                            .setTitle(fcmTopicRequest.title())
                            .setBody(fcmTopicRequest.body())
                            .build())
                    .setTopic(fcmTopicRequest.topicName())
                    .build());
        } catch (FirebaseMessagingException e) {
            throw new FcmException(FcmErrorCode.CAN_NOT_SEND_NOTIFICATION);
        }
    }


    // 받은 token을 이용하여 fcm를 보냄
    @Transactional(readOnly = true)
    @Override
    public void sendMessageByToken(FcmTokenRequest fcmTokenRequest) {
        User user = userRepository.findById(fcmTokenRequest.userId()).orElseThrow(() -> new FcmException(FcmErrorCode.NO_EXIST_USER));
        List<String> tokenList = fcmRepository.findTokenAllByUser(user).orElseThrow(() -> new FcmException(FcmErrorCode.NO_EXIST_TOKEN));
        try {
            FirebaseMessaging.getInstance().sendMulticast(MulticastMessage.builder()
                    .setNotification(Notification.builder()
                            .setTitle(fcmTokenRequest.title())
                            .setBody(fcmTokenRequest.body())
                            .build())
                    .addAllTokens(tokenList)
                    .build());
        } catch (FirebaseMessagingException e) {
            throw new FcmException(FcmErrorCode.CAN_NOT_SEND_NOTIFICATION);
        }
    }

    @Transactional
    @Override
    public void createDeviceToken(Long userId, String deviceToken) {
        User user = userRepository.findById(userId).orElseThrow(() -> new FcmException(FcmErrorCode.NO_EXIST_USER));
        fcmRepository.save(DeviceToken.builder().token(deviceToken).user(user).build());
    }

    @Override
    public void deleteDeviceToken(String deviceToken) {
        fcmRepository.deleteById(deviceToken);
    }

    // 모든 기기에 fcm를 보내는 메서드
    @Override
    public void sendMessageAll(FcmAllRequest FcmAllRequest) {
        List<String> tokenList = fcmRepository.findTokenAll().orElseThrow(() -> new FcmException(FcmErrorCode.NO_EXIST_USER));
        if(tokenList.isEmpty()) throw new FcmException((FcmErrorCode.NO_EXIST_TOKEN));
        try {
            FirebaseMessaging.getInstance().sendMulticast(MulticastMessage.builder()
                    .setNotification(Notification.builder()
                            .setTitle(FcmAllRequest.title())
                            .setBody(FcmAllRequest.body())
                            .build())
                    .addAllTokens(tokenList)
                    .build());
        } catch (FirebaseMessagingException e) {
            throw new FcmException(FcmErrorCode.CAN_NOT_SEND_NOTIFICATION);
        }
    }
}
