package com.suhwakhaeng.common.domain.community.entity;

import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.global.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_comment_parent")
    private CommunityComment parent;

    @Builder.Default
    @OneToMany(mappedBy = "parent", orphanRemoval = true)
    private List<CommunityComment> children = new ArrayList<>();

    @Column(name = "community_comment_content")
    private String content;

    public void addSubComment(CommunityComment subComment) {
        this.children.add(subComment);
        subComment.parent = this;
    }
}
