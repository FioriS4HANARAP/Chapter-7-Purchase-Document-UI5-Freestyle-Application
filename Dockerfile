FROM node:8.11.3

RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo "deb http://dl.google.com/linux/chrome/deb/ stable main" | tee /etc/apt/sources.list.d/google-chrome.list
RUN apt-get update && apt-get -y install google-chrome-stable zip
RUN npm config set @sap:registry https://npm.sap.com