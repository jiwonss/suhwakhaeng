package com.suhwakhaeng.common.domain.mycrops.entity;

import com.suhwakhaeng.common.domain.crops.entity.CropsVariety;
import com.suhwakhaeng.common.domain.mycrops.enums.AreaUnit;
import com.suhwakhaeng.common.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder(toBuilder = true)
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
    @JoinColumn(name = "crops_variety_id")
    private CropsVariety cropsVariety;

    @Column(name = "my_crops_name")
    private String name;

    // 재배 면적 >> 계산 필요
    @Column(name = "my_crops_area")
    private double area;

    // 재배 면적 단위 
    @Enumerated(EnumType.STRING)
    @Column(name = "my_crops_area_unit")
    private AreaUnit areaUnit;

    // 수확량
    @Column(name = "my_crops_yield")
    private int yield;

    // TODO sido, gugun, dong으로 묶고 도로명은 따로 관리하게 리팩토링? >> sido, gugun, dong 묶는 place class / place, 도로명 주소 합친 RoadPlace class
    private String sido;
    private String gugun;
    private String dong;

    public void update(MyCrops myCrops, CropsVariety cropsVariety) {
        this.sido = myCrops.getSido();
        this.gugun = myCrops.getGugun();
        this.dong = myCrops.getDong();
        this.name = myCrops.getName();
        this.area = myCrops.getArea();
        this.areaUnit = myCrops.getAreaUnit();
        this.yield = myCrops.getYield();
        this.cropsVariety = cropsVariety;
    }
}
