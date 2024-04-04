package com.suhwakhaeng.common.domain.diary.entity;

import com.suhwakhaeng.common.domain.mycrops.entity.MyCrops;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
public class Diary {
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "diary_id")
    @Id
    private Long id;

    @ManyToOne(fetch = LAZY, optional = false)
    @JoinColumn(name = "my_crops_id", nullable = false)
    private MyCrops myCrops;

    @Column(name = "diary_date", updatable = false)
    private LocalDate date;

    @Column(name = "diary_content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "diary_memo")
    private String memo;

    @Column(name = "diary_image")
    private String image;
}
