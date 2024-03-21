FROM rohitkapex/rabbitmq-stomp

# Set environment variables for RabbitMQ
ENV RABBITMQ_DEFAULT_USER=ssafy \
    RABBITMQ_DEFAULT_PASS=ssafy
RUN rabbitmq-plugins enable rabbitmq_stomp
# Expose the default RabbitMQ ports
EXPOSE 5672 15672 61613
