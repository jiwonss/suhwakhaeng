package com.suhwakhaeng.common.domain.crops.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CropsVariety {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crops_variety_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crops_id")
    private Crops crops;

    @Column(name = "crops_variety_name")
    private String name;

    @Column(name = "crops_variety_category")
    private String category;

    @Column(name = "crops_variety_usage")
    private String usage;

    @Column(name = "crops_variety_function")
    private String function;

    @Column(name = "crops_variety_characteristic", columnDefinition = "TEXT")
    private String characteristic;

    @Column(name = "crops_variety_adaptation_area")
    private String adaptationArea;

    @Column(name = "crops_variety_caution", columnDefinition = "TEXT")
    private String caution;

    @Column(name = "crops_variety_image")
    private String image;

}

