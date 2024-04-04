package com.suhwakhaeng.common.domain.crops.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CultivationCharacteristic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cultivation_characteristic_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crops_id")
    private Crops crops;

    private String scientificName;
    private String classification;

    @Column(columnDefinition = "TEXT")
    private String physiologicalCharacteristic;

    @Column(columnDefinition = "TEXT")
    private String mainTech;

}
