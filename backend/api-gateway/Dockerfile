FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY build/libs/api-gateway-0.0.1-SNAPSHOT.jar ApiGateway.jar
ENTRYPOINT ["java","-jar","ApiGateway.jar"]