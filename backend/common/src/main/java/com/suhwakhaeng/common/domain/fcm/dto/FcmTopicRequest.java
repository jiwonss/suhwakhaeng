package com.suhwakhaeng.common.domain.fcm.dto;

import lombok.Builder;

@Builder
public record FcmTopicRequest(
        String title,
        String body,
        String topicName
) { }
