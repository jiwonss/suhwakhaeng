FROM openjdk:17-ea-11-jdk-slim
WORKDIR /app
COPY . /app
COPY src/main/resources/chromedriver-linux64/chromedriver /usr/local/bin/

# Install Chrome
RUN apt-get update && \
    apt-get install -y wget gnupg && \
    wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && \
    apt-get install -y google-chrome-stable

# Set Chrome Driver executable permissions
RUN chmod +x /usr/local/bin/chromedriver

COPY build/libs/crawling-0.0.1-SNAPSHOT.jar Crawling.jar
ENTRYPOINT ["java","-jar","Crawling.jar"]