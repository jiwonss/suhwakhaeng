package com.suhwakhaeng.common.global.config;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suhwakhaeng.common.global.common.template.CustomHibernate5Templates;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class QuerydslConfig {

    @PersistenceContext
    private EntityManager entityManager;

    @Bean
    public JPAQueryFactory jpaQueryFactory() {
        return new JPAQueryFactory(new CustomHibernate5Templates(),entityManager);
    }

}
