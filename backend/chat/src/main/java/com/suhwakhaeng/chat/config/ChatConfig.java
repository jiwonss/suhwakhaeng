package com.suhwakhaeng.chat.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@EnableRabbit
@RequiredArgsConstructor
@Configuration
public class ChatConfig {
    private final RabbitMqProperties rabbitMqProperties;
    // RabbitMQ에서 기본적으로 제공하는 Topic 타입의 Exchange를 사용
    private static final String TOPIC_EXCHANGE_NAME = "amq.topic";
    // Topic Exchange에 맞는 라우팅 키 지정
    private static final String ROUTING_KEY = "room.*";

    // 기본 토픽 익스체인지 등록
    @Bean
    public TopicExchange topicExchange() {
        return new TopicExchange(TOPIC_EXCHANGE_NAME);
    }

    @Bean
    public Binding binding() {
        return BindingBuilder
                .bind(topicExchange())
                .to(topicExchange())
                .with(ROUTING_KEY);
    }

    @Bean
    public RabbitTemplate rabbitTemplate() {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory());
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        rabbitTemplate.setRoutingKey(ROUTING_KEY);
        return rabbitTemplate;
    }

    @Bean
    public SimpleMessageListenerContainer container() {
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
        container.setConnectionFactory(connectionFactory());
        return container;
    }

    @Bean
    public ConnectionFactory connectionFactory() {
        CachingConnectionFactory factory = new CachingConnectionFactory();
        factory.setHost(rabbitMqProperties.getHost());
        factory.setUsername(rabbitMqProperties.getUsername());
        factory.setPassword(rabbitMqProperties.getPassword());
        return factory;
    }

    @Bean
    public Jackson2JsonMessageConverter jsonMessageConverter() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, true);
        objectMapper.registerModule(dateTimeModule());

        return new Jackson2JsonMessageConverter(objectMapper);
    }

    @Bean
    public JavaTimeModule dateTimeModule() {
        return new JavaTimeModule();
    }

}
