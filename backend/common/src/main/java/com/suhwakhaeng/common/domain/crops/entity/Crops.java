package com.suhwakhaeng.common.domain.crops.entity;

import com.suhwakhaeng.common.domain.crops.enums.CropsCate;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Crops {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crops_id")
    private Long id;

    @Column(name = "crops_name")
    private String name;

    @Column(name="crops_category")
    @Enumerated(EnumType.STRING)
    private CropsCate category;

    @Column(name = "crops_growing_condition", columnDefinition = "TEXT")
    private String growingCondition;

    @Column(name = "crops_disease_type")
    private String diseaseType;

    @Column(name = "crops_pest_type")
    private String pestType;

}
