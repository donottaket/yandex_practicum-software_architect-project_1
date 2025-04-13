FROM node:18-slim

ENV NODE_ENV development

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i \
    && npm i -g jest \
    && npx playwright install --with-deps chromium

RUN apt-get update && apt-get install -y curl

COPY . .

CMD [ "yarn", "start" ]

EXPOSE 8080