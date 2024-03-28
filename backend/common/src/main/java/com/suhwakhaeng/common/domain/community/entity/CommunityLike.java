package com.suhwakhaeng.common.domain.community.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class CommunityLike {
    @EmbeddedId
    private CommunityLikePK communityLikePK;
}
