FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY build/libs/service-discovery-0.0.1-SNAPSHOT.jar ServiceDiscovery.jar
ENV TZ Asia/Seoul
ENTRYPOINT ["java","-jar","ServiceDiscovery.jar"]