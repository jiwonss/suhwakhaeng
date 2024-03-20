package com.suhwakhaeng.common.domain.crops.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CultivationCharacteristic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cultivation_characteristic_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    private Crops crops;

    private String scientificName;
    private String classification;
    private String physiologicalCharacteristic;
    private String mainTech;

}
