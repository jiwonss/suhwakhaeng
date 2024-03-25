package com.suhwakhaeng.common.domain.crops.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ShippingTimeTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shipping_time_table_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crops_id")
    private Crops crops;

    @Column(name = "shipping_time_table_head")
    private String tableHead;

    @Column(name = "shippping_time_table_title")
    private String tableTitle;

}
