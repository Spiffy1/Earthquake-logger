FROM node:18.1.0 as builder

WORKDIR /app
COPY . .

RUN npm i \
    && npm run build 

CMD ["sh", "-c", "node dist/main.js"]