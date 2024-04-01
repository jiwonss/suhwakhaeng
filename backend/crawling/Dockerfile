FROM openjdk:17-ea-11-jdk-slim
WORKDIR /app
:
# Copy the source code
COPY src src

#COPY src/main/resources/chromedriver-linux64/chromedriver /usr/local/bin/

# Install Chrome and WebDriver
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && CHROMEDRIVER_VERSION=`curl -sS https://chromedriver.storage.googleapis.com/LATEST_RELEASE` \
    && wget -P /tmp "https://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VERSION/chromedriver_linux64.zip" \
    && unzip /tmp/chromedriver_linux64.zip -d /usr/bin \
    && rm /tmp/chromedriver_linux64.zip \
    && chmod +x /usr/bin/chromedriver \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

## Set environment variable for Chrome Driver path (if needed)
#ENV CHROME_DRIVER_PATH=/usr/local/bin/chromedriver

COPY build/libs/crawling-0.0.1-SNAPSHOT.jar Crawling.jar
ENTRYPOINT ["java","-jar","Crawling.jar"]