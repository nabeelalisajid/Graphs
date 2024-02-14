FROM node:18-alpine3.18

WORKDIR /app
ENV MONGODB_URL mongodb://mongo_db:27017/challenge

COPY package.json package-lock.json ./

RUN npm install ci

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
