package com.suhwakhaeng.common.global.common.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

@Getter
@Builder
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)

public class AxisLocation {
    private Double x;
    private Double y;
    private String roadNameAddress;
}
