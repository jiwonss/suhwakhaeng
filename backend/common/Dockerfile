FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY src/main/resources/suhwakhaeng-service-key.json src/main/resources/suhwakhaeng-service-key.json
COPY build/libs/common-0.0.1-SNAPSHOT.jar Common.jar
ENV TZ Asia/Seoul
ENTRYPOINT ["java","-jar","Common.jar"]