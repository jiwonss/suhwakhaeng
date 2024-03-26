FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY build/libs/common-0.0.1-SNAPSHOT.jar Common.jar
ENTRYPOINT ["java","-jar","Common.jar"]