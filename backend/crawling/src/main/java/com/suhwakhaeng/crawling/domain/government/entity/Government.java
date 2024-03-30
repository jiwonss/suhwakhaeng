package com.suhwakhaeng.crawling.domain.government.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Government {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "government_id")
    private Long id;

    @Column(name = "government_title")
    private String title;

    @Column(name = "government_url")
    private String url;

    @Column(name = "government_area")
    private String area;
}
