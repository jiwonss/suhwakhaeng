package com.suhwakhaeng.common.domain.fcm.controller;

import com.suhwakhaeng.common.domain.fcm.dto.FcmAllRequest;
import com.suhwakhaeng.common.domain.fcm.dto.FcmSubscribeRequest;
import com.suhwakhaeng.common.domain.fcm.dto.FcmTokenRequest;
import com.suhwakhaeng.common.domain.fcm.dto.FcmTopicRequest;
import com.suhwakhaeng.common.domain.fcm.service.FcmService;
import com.suhwakhaeng.common.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/fcm")
public class FcmController {
    private final FcmService fcmService;

    @PostMapping("/{deviceToken}")
    public ResponseEntity<?> createDeviceToken(@RequestHeader("X-Authorization-Id") Long userId, @PathVariable String deviceToken) {
        fcmService.createDeviceToken(userId, deviceToken);
        return ResponseEntity.ok().body(Message.success());
    }

    @DeleteMapping("/{deviceToken}")
    public ResponseEntity<?>  deleteDeviceToken(@PathVariable String deviceToken) {
        fcmService.deleteDeviceToken(deviceToken);
        return ResponseEntity.ok().body(Message.success());
    }

    @PostMapping("/topic")
    public ResponseEntity<?> sendMessageTopic(@RequestBody FcmTopicRequest fcmTopicRequest) {
        fcmService.sendMessageByTopic(fcmTopicRequest);
        return ResponseEntity.ok().body(Message.success());
    }

    @PostMapping("/token")
    public ResponseEntity<?> sendMessageToken(@RequestBody FcmTokenRequest fcmTokenRequest) {
        fcmService.sendMessageByToken(fcmTokenRequest);
        return ResponseEntity.ok().body(Message.success());
    }

    @PostMapping("/all")
    public ResponseEntity<?> sendMessageAll(@RequestBody FcmAllRequest FcmAllRequest) {
        fcmService.sendMessageAll(FcmAllRequest);
        return ResponseEntity.ok().body(Message.success());
    }

    @PostMapping("/subscribe")
    public ResponseEntity<?> subscribeByTopic(@RequestBody FcmSubscribeRequest fcmSubscribeRequest) {
        fcmService.subscribeByTopic(fcmSubscribeRequest);
        return ResponseEntity.ok().body(Message.success());
    }
}
