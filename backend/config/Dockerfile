FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY apiEncryptionKey.jks apiEncryptionKey.jks
COPY build/libs/config-0.0.1-SNAPSHOT.jar Config.jar
ENV TZ Asia/Seoul
ENTRYPOINT ["java","-jar","Config.jar"]