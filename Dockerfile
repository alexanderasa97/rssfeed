FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENV PORT=3000
ENV AWS_REGION=us-east-1
ENV AWS_BUCKET_NAME=bbc-news-bucket-sprint2e3

EXPOSE 3000

CMD ["node", "indexraiz.js"]