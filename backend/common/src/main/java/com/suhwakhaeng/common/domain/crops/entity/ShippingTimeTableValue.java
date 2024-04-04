package com.suhwakhaeng.common.domain.crops.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ShippingTimeTableValue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shipping_time_table_value_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shipping_time_table_id")
    private ShippingTimeTable shippingTimeTable;

    private String croppingTypeName;

    @Column(name = "shipping_time_table_value_row_order")
    private int rowOrder;

    @Column(name = "shipping_time_table_value_column_order")
    private int columnOrder;

    @Column(name = "shipping_time_table_value_value")
    private String value;

}
