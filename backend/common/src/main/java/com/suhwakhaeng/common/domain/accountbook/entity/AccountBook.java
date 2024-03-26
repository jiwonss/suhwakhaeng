package com.suhwakhaeng.common.domain.accountbook.entity;

import com.suhwakhaeng.common.domain.accountbook.enums.Finance;
import com.suhwakhaeng.common.domain.mycrops.entity.MyCrops;
import com.suhwakhaeng.common.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class AccountBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_book_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "my_crops_id")
    private MyCrops myCrops;

    @Column(name = "account_book_title")
    private String title;

    @Column(name = "account_book_content")
    private String content;

    @Column(name = "account_book_amount")
    private int amount;

    @Column(name = "account_book_image")
    private String image;

    @Enumerated(EnumType.STRING)
    @Column(name = "ammount_book_finance")
    private Finance finance;

    @Column(name = "account_book_date")
    private LocalDate date;
}
