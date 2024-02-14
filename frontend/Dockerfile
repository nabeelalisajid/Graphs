FROM node:18-alpine3.18

ENV NEXT_PUBLIC_API_URL=http://localhost:5000/data

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install ci

COPY . .

COPY .env.development.local ./,env.development.local
COPY .env.local ./.env.local

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]