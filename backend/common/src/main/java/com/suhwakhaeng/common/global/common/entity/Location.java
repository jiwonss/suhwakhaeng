package com.suhwakhaeng.common.global.common.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

@Getter
@Builder
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Location {
    private String sido;
    private String gugun;
    private String dong;
    private String roadNameAddress;
}
