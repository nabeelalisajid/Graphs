FROM node:18-alpine3.18

WORKDIR /app

COPY package.json package-lock.json ./
COPY .env ./.env
RUN npm install ci

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
