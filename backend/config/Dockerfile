FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY build/libs/config-0.0.1-SNAPSHOT.jar Config.jar
ENTRYPOINT ["java","-jar","Config.jar"]