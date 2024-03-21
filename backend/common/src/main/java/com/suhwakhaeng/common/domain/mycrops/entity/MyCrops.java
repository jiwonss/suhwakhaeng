package com.suhwakhaeng.common.domain.mycrops.entity;

import com.suhwakhaeng.common.domain.crops.entity.Crops;
import com.suhwakhaeng.common.domain.mycrops.enums.AreaUnit;
import com.suhwakhaeng.common.domain.mycrops.enums.Place;
import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.global.common.entity.Location;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class MyCrops {
    @Id
    @GeneratedValue
    @Column(name = "my_crops_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crops_id")
    private Crops crops;

    @Enumerated(EnumType.STRING)
    @Column(name = "my_crops_place")
    private Place place;


    // 재배 면적 >> 계산 필요
    @Column(name = "my_crops_area")
    private double area;

    // 재배 면적 단위 
    @Enumerated(EnumType.STRING)
    @Column(name = "my_crops_area_unit")
    private AreaUnit areaUnit;

    // 정식 시기
    @Column(name = "my_crops_planting_date")
    private LocalDate plantingDate;

    
    // 수확 시기
    @Column(name = "my_crops_harvesting_date")
    private LocalDate harvestingDate;

    // 수확량
    @Column(name = "my_crops_yield")
    private int yield;

    @Embedded
    private Location location;
}
