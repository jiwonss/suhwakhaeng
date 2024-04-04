# Use an OpenJDK base image
FROM openjdk:17.0.1-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the Spring Boot application JAR file built with Gradle into the container
COPY build/libs/crawling-0.0.1-SNAPSHOT.jar /app/Crawling.jar

# Install dependencies for running Selenium with ChromeDriver
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    curl \
    gnupg2 \
    && rm -rf /var/lib/apt/lists/*

# Download and install Chrome browser
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && \
    apt-get install -y google-chrome-stable && \
    rm -rf /var/lib/apt/lists/*


COPY src/main/resources/chromedriver-linux64/chromedriver /usr/bin
RUN chmod +x /usr/bin/chromedriver

# Expose the port your Spring Boot application uses
EXPOSE 9003
ENV TZ Asia/Seoul
# Command to run the Spring Boot application with Selenium
CMD ["java", "-Dwebdriver.chrome.driver=/usr/bin/chromedriver", "-jar", "Crawling.jar"]