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
public class ShippingTimeTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shopping_time_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crops_id")
    private Crops crops;

    private String croppingTypeName;

    @Column(name = "shipping_time_table_row_order")
    private int rowOrder;

    @Column(name = "shipping_time_table_column_order")
    private int columnOrder;

    @Column(name = "shipping_time_table_attr")
    private String attr;

    @Column(name = "shipping_time_table_value")
    private String value;

}
