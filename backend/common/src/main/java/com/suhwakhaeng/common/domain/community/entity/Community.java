package com.suhwakhaeng.common.domain.community.entity;

import com.suhwakhaeng.common.domain.community.enums.Category;
import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.global.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Community extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "community_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User writer;

    @Column(name = "community_content")
    private String content;

    @Column(name = "community_image1")
    private String image1;

    @Column(name = "community_image2")
    private String image2;

    @Column(name = "community_image3")
    private String image3;

    @Column(name = "community_image4")
    private String image4;

    @Column(name = "community_cate")
    private Category category;
}
