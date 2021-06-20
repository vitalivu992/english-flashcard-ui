FROM node:10-alpine
WORKDIR /app
EXPOSE 3100/tcp
COPY ["package.json", "yarn.lock", "./"]
RUN yarn; 
COPY . .
CMD [ "yarn", "start" ]
