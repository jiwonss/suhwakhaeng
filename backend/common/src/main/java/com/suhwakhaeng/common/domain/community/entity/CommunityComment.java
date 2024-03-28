package com.suhwakhaeng.common.domain.community.entity;

import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.global.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class CommunityComment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "community_comment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User writer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_id")
    private Community community;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_comment_group")
    private CommunityComment group;

    @Column(name = "community_comment_level")
    private int level;

    @Column(name = "community_comment_content")
    private String content;

}
